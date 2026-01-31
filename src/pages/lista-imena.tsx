import ListaImena from '../Components/ListaImena/ListaImena';
import data from '../data/names.json';
import { Ime } from '../Interfaces/Ime';

export async function getStaticProps() {
    return {
        props: {
            names: data.names,
        },
    };
}

export default function Page({ names }: { names: Ime[] }) {
    return <ListaImena list={names} />;
}
