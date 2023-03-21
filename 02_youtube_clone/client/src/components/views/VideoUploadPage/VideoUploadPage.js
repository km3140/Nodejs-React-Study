import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropzone from 'react-dropzone';

const opennessOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const categoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];

const VideoUploadPage = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openness, setOpenness] = useState(0);
  const [category, setCategory] = useState('Film & Animation');

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = e => {
    setDescription(e.currentTarget.value);
  };

  const onOpennessChange = e => {
    setOpenness(e.currentTarget.value);
  };

  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Upload Video</h2>
      </div>

      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop multiple maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div style={{ fontSize: '2rem' }}>+</div>
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}

          <div>{/* <img src alt /> */}</div>
        </div>
        <br />
        <Form.Label>Title</Form.Label>
        <Form.Control value={videoTitle} onChange={onTitleChange} type="text" placeholder="Title" />
        <br />
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={onDescriptionChange}
          as="textarea"
          placeholder="Description"
          rows={3}
        />
        <br />
        <select onChange={onOpennessChange}>
          {opennessOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
