const mainSetup = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Document</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
:root {
/* Medical specific colors */
--medical-header: 210 100% 20%;
--medical-section: 0 0% 97%;
--medical-border: 0 0% 75%;
--medical-text: 0 0% 15%;
--medical-label: 0 0% 35%;
}
/* Medical record specific utilities */
.medical-header {
background-color: hsl(var(--medical-header));
color: hsl(var(--primary-foreground));
}
.medical-section {
background-color: hsl(var(--medical-section));
border: 1px solid hsl(var(--medical-border));
}
.medical-label {
color: hsl(var(--medical-label));
font-weight: 600;
}
.medical-text {
color: hsl(var(--medical-text));
}
</style>
</head>
<body>
<div class="max-w-4xl mx-auto bg-white p-8 print:p-6 print:max-w-none">
{{REPLACE_THIS}}
</div>
</body>
</html>
`;

const FOOTER = `
<div class="text-center pt-4 border-t border-medical-border">
<p class="medical-label text-xs">
This medical record is confidential and protected under HIPAA regulations | Page 1 of 1
</p>
</div>
`;

type GenerateTableProps = {
  header: { title: string; key: string }[];
  values: { [key: string]: string }[];
  tableTitle: string;
};
const generateTable = ({ header, values, tableTitle }: GenerateTableProps) => {
  const tableHeaderMap = header
    ?.map(
      (h) =>
        `<th class="border border-medical-border p-3 text-left medical-label text-base">${h.title}</th>`,
    )
    .join('');
  const tableHeader = `
<thead>
<tr class="medical-section">
${tableHeaderMap}
</tr>
</thead>
`;
  const tableBodyTr = values
    ?.map((v, index) => {
      const bodyTd = header
        ?.map(
          (
            h,
          ) => `<td class="border border-medical-border p-3 medical-text text-base">${
            v[h.key] ?? ''
          }</td>
    `,
        )
        .join('');
      if (index % 2 === 0) {
        return `<tr>${bodyTd}</tr>`;
      }
      return `<tr class="bg-medical-section/30">${bodyTd}</tr>`;
    })
    .join('');

  const tableBody = `<tbody>${tableBodyTr}</tbody>`;

  const tableRoot = `
<div class="mb-8">
<h2 class="text-lg font-bold medical-text mb-4">${tableTitle}</h2>
<table class="w-full border-collapse border border-medical-border">
${tableHeader}
${tableBody}
</table>
</div>
`;
  return tableRoot;
};

type GenerateBasicDocInfoProps = {
  values: {
    title: string;
    value: string;
    titleClassName?: string;
    valueClassName?: string;
  }[];
  title: string;
};
const generateBasicDocInfo = ({ title, values }: GenerateBasicDocInfoProps) => {
  const valuesP = values
    .map(
      (e) =>
        `<p class="medical-label ${e.titleClassName || ''}">${
          e.title
        }:<span class="medical-text ${e.valueClassName || ''}">${
          e.value
        }</span></p>`,
    )
    .join('');
  const basicDoc = `
<div class="flex justify-between items-start mb-8 pb-4 border-b-2 border-medical-border">
<div class="flex-1">
<h1 class="text-2xl font-bold medical-text mb-2">${title}</h1>
<div class="space-y-1 text-base">
${valuesP}
</div>
</div>
{{QR}}
</div>
`;
  return basicDoc;
};
