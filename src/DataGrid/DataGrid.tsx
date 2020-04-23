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
}

interface SortableColumnProps extends ColumnProps{
  sort: SortSetting
  setSort: React.Dispatch<React.SetStateAction<SortSetting>>
}

export function Column (props: ColumnProps): React.ReactElement {
  return <th>{props.heading}</th>
}

function SortableColumn (props: SortableColumnProps): React.ReactElement {
  function createClickHandler (direction: SortOrder) {
    if(props.sort && props.sort[0] === props.field) {
      return () => { props.setSort(null) }
    }

    return () => { props.setSort([props.field, direction]) }
  }

  return (
    <th>
      <span>{props.heading}</span>
      <button
        onClick={createClickHandler(SortOrder.Ascending)}
        title={`Ascending sort by ${props.field}`}
        type="button"
      >🔼</button>
      <button
        onClick={createClickHandler(SortOrder.Descending)}
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

interface DataGridProps {
  children: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps>
  data: object[]
}

type SortSpec = [string, SortOrder]
type SortSetting = SortSpec | null

export function DataGrid (props: DataGridProps) {
  const [sort, setSort] = useState(null as SortSetting)

  const columns = React.Children.map(
    props.children,
    child => child.props.sortable
      ? (
        <SortableColumn
          field={child.props.field}
          heading={child.props.heading}
          sort={sort as SortSpec}
          setSort={setSort}
        />
      )
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
        <tr>{columns}</tr>
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