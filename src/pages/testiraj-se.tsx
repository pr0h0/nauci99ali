import TestirajSe from '../Components/TestirajSe/TestirajSe';
import data from '../data/names.json';

export default function Page() {
    return <TestirajSe list={data.names} />;
}
