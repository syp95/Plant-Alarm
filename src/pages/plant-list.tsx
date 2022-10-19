import type { NextPage } from 'next';

import styled from 'styled-components';

import Plant from '../components/PlantListComponents/Plant/Plant';
import Seo from '../components/0.SharedComponents/Seo/Seo';
import { useQuery } from 'react-query';
import { getPlantData, IPlantData } from 'src/apis/plant';
import { NoPlantContainer } from 'styles/plantliststyles';

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
