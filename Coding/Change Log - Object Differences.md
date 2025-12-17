```TypeScript
import { UserRole } from '@prisma/client';import { db } from '../services/db.service';import { objectDifferences } from './objectDifferences';// Alamofire - iOS - Swift// Retrofit - Android - Kotlin / Javainterface AddChangeLog {
  userId: string;  description: string;  module: string;  role?: UserRole;  newValues: Record<string, any>;  oldValues: Record<string, any>;}
const convertToReadableFormat = (str: string) => {
  // Replace camelCase or snake_case with a more readable format  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add space before capital letters    .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter};const formatObjectToCommaSeparatedString = (obj: any) => {
  if (Object.keys(obj).length > 0) {
    return Object.entries(obj)
      .filter(([value]) => value !== null)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key} = ${value.join(', ')}`;        }
        return `${key} = ${value}`;      })
      .join(', ');  }
  return 'N/A';};export const addChangeLog = async (data: AddChangeLog) => {
  try {
    const _excludeKeys = [
      'id',      'createdAt',      'updatedAt',      'userId',      'password',      'lastEventId',      'selfUserId',    ];    const { newChanges, oldChanges } = objectDifferences(
      data.oldValues,      data.newValues,      _excludeKeys,    );    // Object.entries(oldChanges).forEach(async([key, oldValue]) => {    //   const newValue = newChanges[key]; // Get the corresponding new value    //   await db.changeLog.create({    //     data: {    //       description: data.description+" "+convertToReadableFormat(key),    //       module: data.module,    //       role: data.role,    //       userId: data.userId,    //       oldValues: oldValue as any,    //       newValues: newValue,    //     },    //   });    // });    const newObjectToString = formatObjectToCommaSeparatedString(newChanges);    const oldObjectToString = formatObjectToCommaSeparatedString(oldChanges);    const newValue = convertToReadableFormat(newObjectToString);    const oldValue = convertToReadableFormat(oldObjectToString);    await db.changeLog.create({
      data: {
        description: data.description,        module: data.module,        userId: data.userId,        role: data.role,        oldValueJson: oldChanges,        newValueJson: newChanges,        newValue: newValue,        oldValue: oldValue,      },    });  } catch (err) {
    console.error(err);  }
};
```

```TypeScript
import deepDiff from 'deep-diff';// Function to normalize values (treat null, undefined, and empty strings as the same)const normalizeValue = (value: any) => {
  if (value === null || value === undefined || value === '') return null;  return value;};// Function to format date strings (adjust format as needed)const formatDate = (dateString: any) => {
  if (isNaN(Date.parse(dateString))) return dateString; // Not a valid date string  const date = new Date(dateString);  return date.toISOString(); // Format as ISO string (or customize the format)};export const objectDifferences = (
  oldObj: Record<string, any> | any,  newObj: Record<string, any> | any,  excludeKeys: string[] = [],) => {
  // Normalize and format objects before comparison  const normalizeAndFormat = (obj: any) => {
    const newObj = {};    for (const key in obj) {
      if (excludeKeys.includes(key)) continue; // Skip excluded keys      if (typeof obj[key] === 'string' && !isNaN(Date.parse(obj[key]))) {
        // @ts-ignore        newObj[key] = formatDate(obj[key]); // Format date strings      } else {
        // @ts-ignore        newObj[key] = normalizeValue(obj[key]);      }
    }
    return newObj;  };  const normalizedOldObj = normalizeAndFormat(oldObj);  const normalizedNewObj = normalizeAndFormat(newObj);  const differences = deepDiff(normalizedOldObj, normalizedNewObj);  const oldChanges: any = {};  const newChanges: any = {};  if (!differences) return { oldChanges, newChanges };  differences.forEach((difference) => {
    const path = difference?.path?.join('.') as string;    switch (difference.kind) {
      case 'E': // Edit        oldChanges[path] = difference.lhs;        newChanges[path] = difference.rhs;        break;      case 'N': // New        newChanges[path] = difference.rhs;        break;      case 'D': // Deleted        oldChanges[path] = difference.lhs;        break;      case 'A': // Array        // For array differences, recursively call findDifferences if necessary        if (difference.item) {
          const arrayChanges = objectDifferences(
            // @ts-ignore            difference.item.lhs,            // @ts-ignore            difference.item.rhs,            excludeKeys,          );          oldChanges[path] = arrayChanges.oldChanges;          newChanges[path] = arrayChanges.newChanges;        }
        break;    }
  });  return { oldChanges, newChanges };};
```

export const mongoIdRegex = /1{24}$/;

---

1. 0-9a-fA-F↩︎