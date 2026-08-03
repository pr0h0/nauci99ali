import NauciImena from '../Components/NauciImena/NauciImena';
import data from '../data/names.json';

export default function Page() {
    return <NauciImena list={data.names} />;
}
