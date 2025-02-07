import CalendarWithEventList from './components/Calendar';

export default function Race() {
    return (
        <div className='w-full min-h-[100svh] flex flex-col justify-center items-center pt-32'>
            <CalendarWithEventList />
        </div>
    )
}