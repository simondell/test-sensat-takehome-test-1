import React, {
  useState
} from 'react'
import './DataGrid.css'
import { ReactComponent as UpArrow } from './arrow_up-24px.svg'
import { ReactComponent as DownArrow } from './arrow_down-24px.svg'

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
  const sortingByField = props.sort && props.sort[0] === props.field
  const sortDirection = props.sort && props.sort[1]

  function createClickHandler (direction: SortOrder) {
    if(sortingByField && direction === sortDirection) {
      return () => { props.setSort(null) }
    }

    return () => { props.setSort([props.field, direction]) }
  }

  return (
    <th
      className="sortable"
    >
      <span>{props.heading}</span>
      <button
        className={
          sortingByField && sortDirection === SortOrder.Ascending
            ? 'active'
            : ''
        }
        onClick={createClickHandler(SortOrder.Ascending)}
        title={`Ascending sort by ${props.field}`}
        type="button"
      >
        <UpArrow
          height={16}
          width={16}
        />
      </button>
      <button
        className={
          sortingByField && sortDirection === SortOrder.Descending
            ? 'active'
            : ''
        }
        onClick={createClickHandler(SortOrder.Descending)}
        title={`Descending sort by ${props.field}`}
        type="button"
      >
        <DownArrow
          height={16}
          width={16}
        />
      </button>
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
  pageSize: number
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
          setSort={spec => {
            setPageIndex(0)
            setSort(spec)
          }}
        />
      )
      : child
  )

  // Pagination
  const [pageIndex, setPageIndex] = useState(0)

  // set up data to display
  const sorted = sort
    ? [...props.data].sort(bySpec(sort))
    : [...props.data]

  const rowStart = pageIndex * props.pageSize
  const rows = sorted.slice(rowStart, rowStart + props.pageSize)

  return (
    <>
      <table
        className="datagrid"
      >
        <thead>
          <tr>{columns}</tr>
        </thead>
        <tbody>
        {
          rows.map((row: any, rowIndex:  number) =>
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

      {props.pageSize < props.data.length &&
        <div
          className="pagination"
        >
          <button
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            type="button"
          >Prev</button>

          <span>Page {pageIndex + 1} of {Math.ceil(props.data.length / props.pageSize)}</span>

          <button
            disabled={pageIndex + 1 > props.data.length / props.pageSize}
            onClick={() => setPageIndex(pageIndex + 1)}
            type="button"
          >Next</button>
        </div>
      }
    </>
  )
}