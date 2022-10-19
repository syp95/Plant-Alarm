import { motion } from 'framer-motion';
import styled from 'styled-components';

const OpenPicker = styled(motion.div)`
    width: 440px;
    position: absolute;
    bottom: 0;

    @media (max-width: 440px) {
        width: 300px;
    }
`;

const AddPlantContainer = styled.div`
    b {
        font-size: 12px;
        font-weight: 500;
        color: #9d9d9d;
    }
    img {
        border-radius: 50%;
        border: solid 2px #ebebeb;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    input {
        margin-bottom: 30px;
    }
    div {
        font-size: 14px;
    }
    label {
        display: block;
        font-size: 13px;
        text-align: center;
        padding: 10px;
        margin: 10px 0px 30px;
        background-color: #64b058;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        :hover {
            background-color: #59994f;
        }
        :active {
            background-color: #4c8144;
        }
    }
`;

const ImagePickerContainer = styled.div`
    button {
        margin-left: 20px;
    }
`;

const BackBtnContainer = styled.div`
    position: absolute;

    bottom: 6%;
`;

export {
    OpenPicker,
    AddPlantContainer,
    ImagePickerContainer,
    BackBtnContainer,
};
