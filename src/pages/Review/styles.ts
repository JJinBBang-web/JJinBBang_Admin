// styles.ts

export const reviewFilterStyles = {
    select:
      '!h-9 ' +
      '!rounded-sm ' +
      '!border-border ' +
      '!shadow-none'
      ,
  };
  
export const reviewTableStyles = {
    table: `
      [&_.ant-table]:!text-[12px]
      [&_.ant-table-thead>tr>th]:!bg-bg-light
      [&_.ant-table-thead>tr>th]:!px-3.5
      [&_.ant-table-thead>tr>th]:!py-[11px]
      [&_.ant-table-thead>tr>th]:!text-xs
      [&_.ant-table-thead>tr>th]:!font-bold
      [&_.ant-table-thead>tr>th]:!text-text-muted
      [&_.ant-table-thead>tr>th]:!border-border
      [&_.ant-table-tbody>tr>td]:!px-3.5
      [&_.ant-table-tbody>tr>td]:!py-[15px]
      [&_.ant-table-tbody>tr>td]:!border-border-light
      [&_.ant-table-tbody>tr:last-child>td]:!border-b-0
    `,
};

export const sectionTitleClassName =
  'text-xs font-bold uppercase tracking-[0.04em] text-text-disabled';

export const footerButtonClassName =
  '!h-[33px] !w-full !rounded-sm !border-border !text-[13px] !font-semibold !shadow-none';