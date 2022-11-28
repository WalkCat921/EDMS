import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import UserAvatar from '../../images/user-avatar-32.png';

function DashboardCard01() {


    const [analytic, setAnalytic] = useState([{}])

    const getAnalityc = async () => {
        await axios.get('http://localhost:8080/api/dashboard/users/documents').then(response => {
            setAnalytic(response.data)
        })
    }

    useEffect(() => {
        getAnalityc()
    }, [])




    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Топ-5 пользователей по количеству файлов</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Имя пользователя</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Кол-во документов</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">% от общего кол-ва</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {analytic.map((item) => {
                                return (
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <div className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
                                                </div>
                                                <div className="text-slate-800">{item.username}</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-green-500">{item.countOfDocuments}</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">
                                                <NumericFormat
                                                    style={{border:'0px'}}
                                                    disabled={true}
                                                    suffix={'%'}
                                                    decimalScale={0}
                                                    value={item.percentFromAll}
                                                /></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default DashboardCard01;
