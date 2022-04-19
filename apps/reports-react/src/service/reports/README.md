## Reports

Generated after a log arrives
It is the first stage of a report

### Structure

fields: array[]
name: string
type: string

## Goal Template

The goals we will be measuring all log events against

### Structure

amount: number
period: enum [daily, weekly, monthy]
targetReport: report name

## Goal status

A goal template applied to each day (period)

### Structure

startDate: string
template: number
amount: number
