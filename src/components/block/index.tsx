import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";

interface BlockProps extends CommonComponentsProps {
  /**
   * 加载中
   */
  loading?: boolean;
  backgroundColor?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
export const Block: FC<BlockProps> = ({
  children = "",
  loading = false,
  className = "",
  style = {},
  onClick,
}) => (
  <Spin spinning={loading}>
    <section
      className={`${styles.block} ${className}`}
      style={{ backgroundColor, ...style }}
      onClick={onClick}
    >
      {children}
    </section>
  </Spin>
);

Fragment.defaultProps = {
  children: undefined,
  loading: false,
  className: "",
  style: {},
  onClick: () => {},
};

export default Block;
