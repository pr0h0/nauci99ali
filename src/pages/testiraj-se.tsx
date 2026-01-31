import TestirajSe from '../Components/TestirajSe/TestirajSe';
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
    // Key forces re-render if needed, but in next navigation it mounts fresh anyway usually.
    // Original code had key={Date.now()} to force reset.
    // We can let the component handle its own reset or pass a key if needed.
    return <TestirajSe list={names} />;
}
