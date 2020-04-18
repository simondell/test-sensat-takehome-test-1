import React from 'react';
import { SensorRecord } from `../types`
import {
  Column,
  DataTable,
} from '../../shared/DataTable'

interface ColumnProps {
  field: string
  heading: string
  sortable?: boolean
}

export function Column (props: ColumnProps): React.ReactElement {
  return <th>{props.heading}</th>
}

interface ReadingsTableProps {
  records: SensorRecord[]
}

export function ReadingsTable (props: ReadingsTableProps) {
  if(!props.records.length) return null

  return (
    <DataTable
      data={props.records}
    >
      <Column
  )
}