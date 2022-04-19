import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import './CBIR.css';

const CBIR = () => {
    const [urlInput, setUrlInput] = useState("");
    const [imageRetrivalType, setImageRetrivalType] = useState("select");
    const [images, setImages] = useState([]);

    const onkeydown = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    const onClickClear = () => {
        setUrlInput("");
        setImages([]);
        setImageRetrivalType("select");
    }

    const handleSubmit = () => {
        Axios.post(`http://18.205.21.222/cbir`, {
            url: urlInput,
            type: imageRetrivalType
        })
        .then(res => {
            setImages(res.data);
        })
        .catch(() => {
            alert("Error in API call, please try again with valid input");
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(urlInput === "") {
            alert("Please enter a valid URL");
            return;
        }

        if(imageRetrivalType === "select") {
            alert("Please select an image retrieval type");
            return;
        }

        handleSubmit();
        console.log(urlInput);
        console.log(imageRetrivalType);
    }

    const onChange = (e) => {
        setUrlInput(e.target.value);

        if(e.target.value === "") {
            setImages([]);
        }
    }

    const onChangeImageRetrivalType = (e) => {
        setImageRetrivalType(e.target.value);
    }


    const renderCBIRHeader = () => (
        <div>
            <p className="CBIR-search-p">Content Based Image Retrieval</p>
        </div>
    )

    const renderSearchInput= () => {
        return (
            <div className="CBIR-search-input">
                <input
                    className="CBIR-search-input-text"
                    type="text"
                    placeholder="Provide image URL"
                    onChange={onChange}
                    value={urlInput}
                />
                <select
                    className="CBIR-search-input-dropdown"
                    onChange={onChangeImageRetrivalType}
                    value={imageRetrivalType}
                >
                    <option value="select">Select an image retrieval type</option>
                    <option value="rgb">RGB Histogram</option>
                    <option value="hog">HOG</option>
                    <option value="vgg16">VGG-16</option>
                </select>
                <button className="CBIR-search-button" onClick={onSubmit} onKeyDown={onkeydown}>Search</button>
            </div>
        )
    }

    const renderCBIRSearch = () => {
        return (
            <div className="CBIR-search">
                <Row className="justify-content-md-center">
                    <Col md={6} >
                        {renderCBIRHeader()}
                        {renderSearchInput()}
                    </Col>
                    <p style={{cursor: "pointer" ,textAlign: 'center', textDecoration: 'underline', color:"white", marginTop: 10}} onClick={onClickClear}>clear</p>
                </Row>
            </div>
        );
    };

    const renderQueryImage = () => {

        if (images.length === 0) {
            return;
        }

        return (
            <div className="CBIR-images-container">
                <Row className="justify-content-md-center">
                    <h1 style={{textAlign:"center"}}>Query Image:</h1>
                    <Col md={5}>
                        <div className="CBIR-query-image">
                            <center><img src={urlInput} alt="Query Image" /></center>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    };

    const renderImages = () => {

        if (images.length === 0) {
            return;
        }

        return (
            <div className="CBIR-images-container">
                <Row className="justify-content-md-center">
                    <h1 style={{textAlign:"center"}}>Results:</h1>
                    {images.map((image, index) => (
                        <Col md={3} key={index}>
                            <div className="CBIR-image">
                                <center><img src={image.url} alt="Image" /></center>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <h4>{index + 1}</h4>
                                <p><b>Match:</b> {image.similarity}</p>
                                <p><b>Metric:</b> {image.metric}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        );

    };

    return (
        <div className="CBIR-main">
            {renderCBIRSearch()}
            {renderQueryImage()}
            {renderImages()}
        </div>
    );
}

export default CBIR;