'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ColumnDef } from '@tanstack/react-table'
import styles from './Analysis.module.scss'
import { Button } from '@/components/ui/button'
import MoreSvg from '@/components/svg/more.svg'
import ArrowUp from '@/components/svg/arrow-up.svg'
import ArrowDown from '@/components/svg/arrow-down.svg'
import TestReport from '@/components/svg/test-report.svg'
import TestAnalysis from '@/components/svg/test-analysis.svg'
import Link from 'next/link'

export type TTests = Array<{
  id: string
  title: string
  participantsCount: number
  employersTotalCount: number
}>

export type TCompanies = {
  id: string
  title: string
  tests?: TTests
}

export const companiesColumns: ColumnDef<TCompanies>[] = [
  {
    accessorKey: 'title',
    header: 'عنوان سازمان'
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className={styles.actions}>
        <div
          className={styles.arrow}
          onClick={() => {
            row.getIsExpanded()
              ? row.toggleExpanded(false)
              : row.toggleExpanded(true)
          }}
        >
          {row.getIsExpanded() ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
    )
  }
]

export const companiesSubColumns: ColumnDef<TTests>[] = [
  {
    accessorKey: 'title',
    header: 'عنوان سازمان',
    //@ts-ignore
    cell: ({ row }) => <div className={styles.subTableTitle}>{row.title}</div>
  },
  {
    accessorKey: 'participantsCount',
    header: 'تعداد شرکت‌کننده‌ها',
    cell: ({ row }) => (
      <div className={styles.subTitleCell}>
        {
          //@ts-ignore
          row.participantsCount.toLocaleString('fa-IR')
        }{' '}
        نفر
      </div>
    )
  },
  {
    accessorKey: 'employersTotalCount',
    header: 'تعداد کل کارمندان',
    cell: ({ row }) => (
      //@ts-ignore
      <div className={styles.subTitleCell}>
        {
          //@ts-ignore
          row.employersTotalCount.toLocaleString('fa-IR')
        }{' '}
        نفر
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <div className={styles.subTableActions}>
          <Link href='analysis/1' className={styles.analysisBtn}>
            <span>
              <TestReport />
            </span>
            تحلیل کلی
          </Link>
          <Popover>
            <PopoverTrigger className={styles.more}>
              <div>
                <MoreSvg />
              </div>
            </PopoverTrigger>
            <PopoverContent className={styles.subTableMoreContent}>
              <Button>دانلود تحلیل (PDF)</Button>
            </PopoverContent>
          </Popover>
        </div>
      )
    }
  }
]
