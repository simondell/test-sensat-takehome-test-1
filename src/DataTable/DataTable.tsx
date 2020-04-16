import React from 'react';

interface DataTableProps {
  data: any[]
}

export default function DataTable (props: DataTableProps) {
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