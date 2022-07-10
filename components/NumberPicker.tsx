import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { numberPickerState } from '../atoms/atoms';

const SubmitButton = styled.button`
    font-size: 20px;
    position: absolute;
    background-color: white;
    color: white;
    left: 20px;
    top: 20px;
`;

const PickerContainer = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: black;

    ul {
        list-style: none;
        text-align: center;
    }
`;

export default function NumberPicker() {
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const onNumberSubmit = () => {
        //값 전달
        setNumberPicker(false);
    };

    return (
        <PickerContainer>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
            </ul>
            <SubmitButton onClick={onNumberSubmit}>Submit</SubmitButton>
        </PickerContainer>
    );
}
