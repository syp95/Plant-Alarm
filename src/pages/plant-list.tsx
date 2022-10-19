import type { NextPage } from 'next';

import styled from 'styled-components';

import Plant from '../components/PlantListComponents/Plant/Plant';
import Seo from '../components/SharedComponents/Seo/Seo';
import { useQuery } from 'react-query';
import { getPlantData, IPlantData } from 'src/apis/plant';

const NoPlantContainer = styled.div`
    background-color: white;
    margin-top: 40px;
    width: 100%;
    height: 120px;
    border: 2px solid #ebebeb;
    border-radius: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const PlantList: NextPage = () => {
    const { data: plantList } = useQuery<IPlantData[]>(
        ['plantList', 'plant'],
        getPlantData,
    );

    return (
        <>
            <Seo title='리스트' />
            <h2>식물 리스트</h2>
            {plantList?.length === 0 ? (
                <NoPlantContainer>
                    추가한 식물이 없습니다. <br />
                    식물을 추가해보세요.
                </NoPlantContainer>
            ) : (
                ''
            )}
            {plantList?.map((plant) => {
                return <Plant key={plant.id} plantData={plant} />;
            })}
        </>
    );
};

export default PlantList;
