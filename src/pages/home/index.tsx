import React, { useState, useEffect, FC } from "react";
import { Button } from "antd";
import { Title, Icon } from "@bees/ui";
import Block from "@/components/block";
import Former from "@/components/former";
import { SEX } from "@/constant";

const Fragment: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <Block loading={loading}>
      <Title level={1} strong title="首页" icon={<Icon type="function" />}>
        <Button type="link" size="small" icon={<Icon type="more" />} />
      </Title>
      <Former
        labelCol={8}
        wrapperCol={16}
        gutter={0}
        column={3}
        datasource={({ checks }) => [
          {
            label: "输入框",
            key: "input",
            view: "Input",
            type: "integer",
            rules: [{ type: "amount" }],
            viewProps: {
              size: "middle",
            },
          },
          {
            label: "多选框",
            key: "checks",
            view: "CheckboxGroup",
            viewProps: {
              options: [
                { label: "Apple", value: "Apple" },
                { label: "Pear", value: "Pear" },
                { label: "Orange", value: "Orange" },
              ],
            },
          },
          {
            visible: (checks || []).includes("Apple"),
            label: "选择框",
            key: "select",
            view: "Select",
            viewProps: {
              options: SEX,
            },
          },
        ]}
      />
    </Block>
  );
};

export default Fragment;
