const StatisticTable = ({ data = [] }) => {

    return (
        <>
            <table>
                <tbody>
                    {
                        data?.map(({ name, value }) => (
                            <tr key={name}>
                                <td>{name}</td>
                                <td>{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default StatisticTable
