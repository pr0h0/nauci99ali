import NauciImena from '../Components/NauciImena/NauciImena';
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
    return <NauciImena list={names} />;
}
