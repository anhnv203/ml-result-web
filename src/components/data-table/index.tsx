import React, { useState } from 'react';
import { Table } from 'antd';
const dataSource = [
    {
        id: '8a9b9552-c1b1-4406-a99b-805194797a71',
        paperType: 'DischargePaper',
        rawDate: JSON.stringify({
            line_0: 'Hoàn Mỹ Cho Có Phần Bệnh Viện Vạn Phúc Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam MSOUBV.01',
            line_1: 'Bộ trú trừ : 11014115',
            line_2: 'Được lập - Tự đo - Hạnh phúc',
            line_3: 'MITTERS',
            line_4: 'GIẤY RA VIỆN',
            line_5: 'Họ tên người bệnh: lê an nhi',
            line_6: 'Tuổi: 16 Tháng',
            line_7: 'Nam/Nữ: Nữ',
            line_8: 'Dân tộc: Kinh Nghiệp: Trẻ Dưới 6 Tuổi',
            line_9: 'MÃ SỐ BHXH/THẻ BHYT SỐ :',
            line_10: 'Địa chỉ: Tân Hiệp - H. Tân Uyên - Bình Dương',
            line_11: 'Vào viện lúc : 21 giờ 09 phút , ngày 16 tháng 05 năm 2021',
            line_12: 'Ra viện lúc: 11 giờ 00 phút , ngày 20 tháng 05 năm 2021',
            line_13: 'Chần đoán: Nhiễm siêu vi; Co giật do sốt (B34; R56.0)',
            line_14: 'Phương pháp điều trị: Nội khoa',
            line_15: 'Gin Ghi chú: Uống thuốc theo toa . Tái khám khi hết thuốc hoặc có dấu hiệu bất thường',
            line_16: 'Ngày 20 Tháng 5 Năm 2021.',
            line_17: 'Ngày 20 Tháng 5 Năm 2021.',
            line_18: 'Thu trương đơn vị',
            line_19: 'Trưởng khoa',
            line_20: 'Compy',
            line_21: 'Sau Thuy Thuy nghiệp thuy nghiệp thuy',
            line_22: 'BỆNH VIỆN',
            line_23: 'BS.Nguyễn Tông Hoàn',
            line_24: 'Họ vấ tên...........',
        }),
        passedData: JSON.stringify({
            address: 'Tân Hiệp H. Tân Uyên - Bình Dương',
            diagnosis: 'Nhiễm siêu vi; Co gốậ (B34; R56.0)',
            paper_type: 'DischargePaper',
            discharged_at: '2021-05-20T11:00:00',
            hospitalized_at: '2021-05-16T21:09:00',
        }),
        createdAt: '2021-09-21T03:09:37.884838+00:00',
        updatedAt: '2021-09-21T03:09:37.884838+00:00',
    },
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'paperType',
        dataIndex: 'paperType',
        key: 'paperType',
    },
    {
        title: 'rawDate',
        dataIndex: 'rawDate',
        key: 'rawDate',
    },
    {
        title: 'passedData',
        dataIndex: 'passedData',
        key: 'passedData',
    },
    {
        title: 'createdAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'updatedAt',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
];
const DataTable = () => {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};
export default DataTable;
