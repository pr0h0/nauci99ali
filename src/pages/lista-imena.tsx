import ListaImena from '../Components/ListaImena/ListaImena';
import data from '../data/names.json';

export default function Page() {
    return <ListaImena list={data.names} />;
}
