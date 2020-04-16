import React from 'react';

export interface ColumnProps {
  field: string
  heading: string
  sortable?: boolean
}

export function Column (props: ColumnProps) {
  return null
}

export interface DataTableProps {
  children?: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps>
  data: any[]
}

export function DataTable (props: DataTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>heading</th>
        </tr>
      </thead>
      <tbody>
      {
        props.data.map((item: any) =>
          <tr
            key={`${item.id}-${item.reading_ts}`}
          >
            <td>{item.name}</td>
          </tr>
        )
      }
      </tbody>
    </table>
  )
}