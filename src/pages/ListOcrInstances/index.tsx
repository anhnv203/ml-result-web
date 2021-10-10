import React, { useState } from 'react';
import { DataTable } from 'src/components';
import Layouts from 'src/components/layouts';
import { gql, useQuery } from '@apollo/client';
import { Button, Table, Tag, Image, Input, Form, Checkbox } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import S3 from 'aws-sdk/clients/s3';
import * as fse from 'fs-extra';
import dotenv from 'dotenv';
import { join } from 'path';
import { UserOutlined } from '@ant-design/icons';
// Amplify.configure(awsconfig);
const GET_PAPERS = gql`
    query GetPapers {
        classification_papers {
            paper_id
            paper_type
            raw_data
            parsed_data
            s3_params
            created_at
            updated_at
        }
    }
`;
const encode = (data: any) => {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64;
};

const ListOcrInstance = () => {
    dotenv.config();
    const { loading, error, data } = useQuery(GET_PAPERS);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageData, setImageData] = useState('undefined');
    const listPapers = data?.classification_papers;
    const downloadImage = async (s3Params: any) => {
        const { key, bucket_name } = s3Params;
        const s3Client = new S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        });
        const path = 'paper.png';
        const params = {
            Bucket: bucket_name,
            Key: key,
        };
        s3Client.getObject(params, async (err, data) => {
            if (err) {
                console.log('🚀 ~ file: index.tsx ~ line 44 ~ awaits3Client.getObject ~ err', err);
            }
            const buffer = encode(data.Body);
            setImageData(buffer);
        });
        return path;
    };
    const showModal = async (params: any) => {
        const path = await downloadImage(params);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'paper_id',
            key: 'paper_id',
        },
        {
            title: 'paperType',
            dataIndex: 'paper_type',
            key: 'paper_type',
            render: (text: any) => <Tag color={text !== 'OtherPaper' ? 'blue' : 'red'}>{text}</Tag>,
        },
        {
            title: 'passedData',
            dataIndex: 'parsed_data',
            key: 'parsed_data',
            render: (text: any) => (
                <div>
                    <h5>Address: {text.address}</h5>
                    <h5>Patient: {text.patient_name}</h5>
                    <h5>Hospital: {text.hospital_name}</h5>
                    <h5>Hospitalized At: {text.hospitalized_at}</h5>
                    <h5>Discharged At: {text.discharged_at}</h5>
                    <h5>Diagnosis: {text.diagnosis}</h5>
                </div>
            ),
        },
        {
            title: 'rawData',
            dataIndex: 'raw_data',
            key: 'raw_data',
            render: (data: any) => (
                <div>
                    <textarea style={{ width: 300, height: 200 }}>{JSON.stringify(data)}</textarea>
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 's3_params',
            key: 'updated_at',
            render: (params: any) => (
                <div>
                    <Button onClick={() => showModal(params)}>View</Button>
                </div>
            ),
        },
    ];
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <Layouts>
            <>
                <Modal title="Review Paper data" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Image src={`data:image/jpeg;base64,${imageData}`} />
                    {/* <Form {...layout} name="nest-messages">
                        <Form.Item name={['paper', 'address']} label="Address">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['paper', 'patient']} label="Patient">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['paper', 'hospital']} label="Hospital">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['paper', 'hospitalized_at']} label="Hospitalized At">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['paper', 'discharged_at']} label="Discharged_At">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['paper', 'diagnosis']} label="Diagnosis">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form> */}
                </Modal>
            </>
            <Table dataSource={listPapers} columns={columns} />
        </Layouts>
    );
};

export default ListOcrInstance;
