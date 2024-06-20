<template>
  <CombineTable :columns="columns" :request="request" isRow>
    <template #bodyCell="{ record, column }">
      <template v-if="column.dataIndex === 'operation'">
        <a @click="copyText(record.name)">复制</a>
      </template>
    </template>
  </CombineTable>
</template>
<script lang="ts" setup>
import CombineTable from "@/components/combineTable/index.vue";
import { columns } from "./_config";
import { copyText } from "@/utils";
// 
interface DataItem {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 61; ++i) {
  data.push({
    key: i,
    name: `Screem ${i + 1}`,
    platform: "iOS",
    version: "10.3.4.5654",
    upgradeNum: 500,
    creator: "Jack",
    createdAt: "2014-12-24 23:12:00",
  });
}

const searchFn = (params: {
  pageSize: number;
  pageNum: number;
  [key: string]: any;
}) => {
  const { pageSize, pageNum } = params;
  return {
    list: data.slice((pageNum - 1) * pageSize, pageNum * pageSize),
    page: { total: data.length, pageNum, pageSize },
  };
};

const request = (params: any) => {
  return new Promise((resolve) => {
    resolve(searchFn(params));
  });
};
</script>
