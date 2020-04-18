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
  sortable?: boolean
  setSort?: React.Dispatch<React.SetStateAction<SortSetting>>
  // sortBy: (field: string, direction: SortOrder) => void
}

export function Column (props: ColumnProps): React.ReactElement {
  if(!props.sortable) {
    return <th>{props.heading}</th>
  }

  return (
    <th>
      <span>{props.heading}</span>
      <button
        onClick={() => props.setSort && props.setSort([props.field, SortOrder.Ascending])}
        title={`Ascending sort by ${props.field}`}
        type="button"
      >🔼</button>
      <button
        onClick={() => props.setSort && props.setSort([props.field, SortOrder.Descending])}
        title={`Descending sort by ${props.field}`}
        type="button"
      >🔽</button>
    </th>
  )
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
  children: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps>
  data: object[]
}

type SortSpec = [string, SortOrder]
type SortSetting = SortSpec | null

export function DataTable (props: DataTableProps) {
  const fields = React.Children.map(
    props.children,
    child => child && child.props.field
  )

  const [sort, setSort] = useState(null as SortSetting)

  const columns = React.Children.map(
    props.children,
    child => child.props.sortable
      ? React.cloneElement(child, { ...child.props, setSort })
      : child
  )

  let sortedData
  if(sort) {
    sortedData = [...props.data]
    sortedData.sort(bySpec(sort))
  }
  else {
    sortedData = props.data
  }

  return (
    <table>
      <thead>
        <tr>
        {
          columns
        }
        </tr>
      </thead>
      <tbody>
      {
        sortedData.map((row: any, rowIndex:  number) =>
          <tr
            key={`${row.id}-${row.reading_ts}`}
          >
          {
            columns && 
            columns.map(column => {
              const { field } = column.props
              return (
                <td
                  key={`cell-${rowIndex}-${field}`}
                >
                {
                  row[field]
                }
                </td>
              )
            })
          }
          </tr>
        )
      }
      </tbody>
    </table>
  )
}