import React from 'react';

interface ColumnProps {
  field: string
  heading: string
  sortable?: boolean
}

export function Column (props: ColumnProps): React.ReactElement {
  return <th>{props.heading}</th>
}

interface ReadingsTableProps {
  children?: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps> | undefined
  data: object[]
}

export function ReadingsTable (props: ReadingsTableProps) {
  const fields = React.Children.map(
    props.children,
    child => child && child.props.field
  )

  return (
    <table>
      <thead>
        <tr>
        {
          props.children
        }
        </tr>
      </thead>
      <tbody>
      {
        props.data.map((item: any, rowIndex:  number) =>
          <tr
            key={`${item.id}-${item.reading_ts}`}
          >
          {
            fields && fields.map((fieldName: string) =>
              <td
                key={`cell-${rowIndex}-${fieldName}`}
              >
              {
                item[fieldName]
              }
              </td>
            )
          }
          </tr>
        )
      }
      </tbody>
    </table>
  )
}