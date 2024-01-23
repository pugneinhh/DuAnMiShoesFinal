import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { PlusCircleFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const CloudinaryUpload = ({onLinkAnhChange}) => {
  const [linkAnh, setLinkAnh] = useState(null);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // Gửi file lên Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mishoes');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtetgawxc/image/upload',
        formData
      );

      // Lấy URL của ảnh từ response và gán vào biến linkAnh
      const imageUrl = response.data.secure_url;
      setLinkAnh(imageUrl);

      onLinkAnhChange(imageUrl);
      // Gọi onSuccess để thông báo cho Ant Design rằng upload thành công
      onSuccess();

      // Hiển thị thông báo thành công
    } catch (error) {
      // Gọi onError để thông báo cho Ant Design rằng có lỗi xảy ra trong quá trình upload
      onError();

      // Hiển thị thông báo lỗi
      message.error('Đã xảy ra lỗi trong quá trình upload.');
    }
  };
  return (
    <Upload
      customRequest={customRequest}
      listType="picture-card"
      showUploadList={false}
    >
        {linkAnh ? (
        <img src={linkAnh} alt="Ảnh đã upload" style={{ width: '100%' }} />
      ) : (
        <div>
          <p><PlusOutlined size={50} className='mt-3'/><br></br>Upload</p>

        </div>
      )}
    </Upload>
  );
};

export default CloudinaryUpload;
