import { useContext } from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useQuery } from '@tanstack/react-query'
import { ContextApi } from '../../../Providers/ContextProvider'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';


export const Analytics = () => {

    const { user } = useContext(ContextApi);
    
    const axiosSecure = useAxiosSecure();

    const { data: myCamps = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['regCampsDisplay'],
        queryFn: () => myRegCampsData(),
    })

    const myRegCampsData = async () => {
        const { data } = await axiosSecure(`/myRegCamps/${user?.email}`)
        return data
    }

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
    };

    return (
        <div>
            <SectionHead
                title={"Registered Camps' Analytics"}
            ></SectionHead>
            <div>
                <div className='w-auto overflow-x-auto'>
                    <BarChart
                        width={1050}
                        height={400}
                        data={myCamps}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis/>
                        <Tooltip></Tooltip>
                        <Bar dataKey="campFee" fill={'#ffa50c'} shape={<TriangleBar />} label={{ position: 'top' }} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
