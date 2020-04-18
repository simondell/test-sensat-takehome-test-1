import React, {
  useState
} from 'react';

enum SortOrder {
  Ascending,
  Descending,
}

enum Comparison {
  lt = -1,
  eq,
  gt
}

interface ColumnProps {
  field: string
  heading: string
  // sortable?: boolean
  // sortBy: (field: string, direction: SortOrder) => void
}

export function Column (props: ColumnProps): React.ReactElement {
    return <th>{props.heading}</th>
  // if(!props.sortable) {
  // }
  // return (
  //   <th>
  //     {props.heading}
  //     <button
  //       type="button"
  //       onClick={() => {}}
  //     >🔼</button>
  //     <button
  //       type="button"
  //       onClick={() => {}}
  //     >🔽</button>
  //   </th>
  // )
}

type Comparable = {
  [key: string]: any
}

function bySpec (
  spec: SortSpec
) {
  return (first: Comparable, second: Comparable): number => {
    const [key, direction] = spec
    const firstProp = first[key]
    const secondProp = second[key]

    if(firstProp < secondProp) {
      return direction === SortOrder.Ascending
        ? Comparison.lt
        : Comparison.gt
    }
    else if(firstProp > secondProp) {
      return direction === SortOrder.Ascending
        ? Comparison.gt
        : Comparison.lt
    }
    else {
      return Comparison.eq
    }
  }
}

interface DataTableProps {
  children?: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps> | undefined
  data: object[]
}

type SortSpec = [string, SortOrder]
type SortSetting = SortSpec | null

export function DataTable (props: DataTableProps) {
  const fields = React.Children.map(
    props.children,
    child => child && child.props.field
  )

  const spec: SortSetting = ['sensor_type', SortOrder.Ascending]

  let sortedData
  if(spec) {
    sortedData = [...props.data]
    sortedData.sort(bySpec(spec))
  }
  else {
    sortedData = props.data
  }

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
        sortedData.map((item: any, rowIndex:  number) =>
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