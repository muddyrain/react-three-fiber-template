import React, { useState, useEffect, FC } from 'react'
import { Button } from 'antd'
import { Title, Icon } from '@bees/ui'
import { Block } from '@/components'
const Fragment: FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])
  return (
    <Block loading={loading}>
      <Title level={1} strong title='首页' icon={<Icon type='function' />}>
        <Button type='link' size='small' icon={<Icon type='more' />} />
      </Title>
    </Block>
  )
}

export default Fragment
