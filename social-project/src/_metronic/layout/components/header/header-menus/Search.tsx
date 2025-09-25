import { KTIcon } from "@/_metronic/helpers";
import request from "@/components/axios";
import { useDebounce } from "@/components/hooks/useDebounce";
import avatarDefault from "@/components/images/avatar-default.jpg";
import logoDefault from "@/components/images/organization-avt.png";
import { getFullName, getUserRole } from "@/components/utils";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import clsx from "clsx";

const Search: FC = () => {

    const navigate = useNavigate();

    const { pathname } = useLocation()

    const [search, setSearch] = useState<string>('');

    const [searchList, setSearchList] = useState<any>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchDebounce = useDebounce(search, 500);

    useEffect(() => {
        if (!searchDebounce) return
        handleSearch()
    }, [searchDebounce])

    async function handleSearch() {
        setIsLoading(true)
        try {
            const data = await request.post('/search/get', { search: searchDebounce })
            setSearchList(data?.data?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onSearch = (search: string) => {
        setSearch(search)
    }

    const handleResetSearch = () => {
        setSearch('')
    }

    return (
        <>
            <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px w-2xxl-350px p-14px rounded-50px black-brand-200 fw-normal border-secondary bg-light-gray-300 border-0 py-12px ps-16px pe-40px"
                placeholder="Search anything..."
                value={search}
                onChange={(e) => {
                    onSearch(e.target.value)
                }}
            />
            {searchDebounce ? (
                <div
                    className="position-absolute ms-6 end-15px tertiary-100 cursor-pointer"
                    onClick={() => handleResetSearch()}
                >
                    <X size={20} />
                </div>
            ) : (
                <div
                    className="position-absolute ms-6 end-15px tertiary-100 cursor-pointer"
                    onClick={() => handleSearch()}
                >
                    <KTIcon
                        iconName="magnifier"
                        className="fs-1"
                    />
                </div>
            )}

            {searchDebounce && (
                <div
                    className='card card-body position-absolute z-index-1 p-16px border rounded-12px overflow-hidden'
                    style={{
                        top: 'calc(100% + 8px)',
                        left: '0',
                        width: 'calc(100% + 1px)',
                    }}
                >
                    {isLoading
                        || ((searchList?.companies?.length === 0 || (searchList?.companies?.length > 0 && pathname.includes("companies")))
                        && (searchList?.users?.length === 0 || (searchList?.users?.length > 0 && pathname.includes("users")))
                        && (searchList?.batches?.length === 0 || (searchList?.batches?.length > 0 && pathname.includes("batches"))))
                        ? (
                            <span className='text-center text-gray-700'>
                                {isLoading ? 'Loading data, Please wait...' : ' No matching records found'}
                            </span>
                        ) : (
                            <div className='d-flex align-items-start justify-content-start flex-column overflow-y-auto mh-400px'>
                                {!pathname.includes("companies") && searchList.companies && searchList.companies.length > 0 && (
                                    <div className="w-100 mb-16px">
                                        <div className="medium-gray-500 fs-14 fw-normal">Companies</div>
                                        {(searchList.companies.slice(0, 5)).map((company: any, index: number) => (
                                            <div
                                                className="fs-14 fw-normal dark-gray-500 primary-500-hover cursor-pointer"
                                                onClick={() => {
                                                    navigate(`/companies/details/${company.company_id}`)
                                                    setSearch("")
                                                }}
                                                key={index}
                                            >
                                                <div className={clsx("d-flex align-items-center justify-content-start gap-16px p-14px", index !== searchList.companies.length - 1 && "border-bottom" )}>
                                                    <img
                                                        src={company.company_logo || logoDefault}
                                                        alt=""
                                                        className="w-28px h-28px rounded-circle object-fit-contain border"
                                                    />
                                                    <div className="d-flex flex-column fs-14 fw-normal">
                                                        <span className="fs-14 fw-normal">{company.company_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {searchList.companies.length >= 5 && (
                                            <div
                                                className="fs-14 fw-medium text-center text-primary cursor-pointer mt-2"
                                                onClick={() => {
                                                    navigate('/companies/', {
                                                        state: {
                                                            searchValue: search,
                                                        },
                                                    })
                                                    setSearch("")
                                                }}
                                            >
                                                Show more
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!pathname.includes("users") && searchList.users && searchList.users.length > 0 && (
                                    <div className="w-100 mb-16px">
                                        <div className="medium-gray-500 fs-14 fw-normal">Users</div>
                                        {(searchList.users.slice(0, 5)).map((user: any, index: number) => (
                                            <div
                                                className={clsx("d-flex align-items-center justify-content-start gap-16px p-14px", index !== searchList.users.length - 1 && "border-bottom")}
                                                key={user.user_id}
                                            >
                                                <img
                                                    src={user.avatar || avatarDefault}
                                                    alt=""
                                                    className="w-28px h-28px rounded-circle object-fit-contain border"
                                                />
                                                <div className="d-flex flex-column fs-14 fw-normal">
                                                    <span className="fs-14 fw-normal">{getFullName(user)}</span>
                                                    <span className="fs-14 fw-normal medium-gray-500">{getUserRole(user.role)}</span>
                                                    <span className="fs-14 fw-normal medium-gray-500">{user.email}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {searchList.users.length >= 5 && (
                                            <div
                                                className="fs-14 fw-medium text-center text-primary cursor-pointer mt-2"
                                                onClick={() => {
                                                    navigate('/users', {
                                                        state: {
                                                            searchValue: search,
                                                        },
                                                    })
                                                    setSearch("")
                                                }}
                                            >
                                                See more
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!pathname.includes("documents") && searchList.batches && searchList.batches.length > 0 && (
                                    <div className="w-100">
                                        <div className="medium-gray-500 fs-14 fw-normal">Batches</div>
                                        {(searchList.batches.slice(0, 10)).map((batch: any, index: number) => (
                                            <div
                                                className={clsx("d-flex align-items-center justify-content-start gap-16px p-14px cursor-pointer dark-gray-500 primary-500-hover", index !== searchList.batches.length - 1 && "border-bottom")}
                                                key={batch.batch_id}
                                                onClick={() => {
                                                    navigate(`/documents/details/${encodeURIComponent(batch.batch_id)}`)
                                                    setSearch("")
                                                }}
                                            >
                                                <div className="d-flex flex-column fs-14 fw-normal">
                                                    <span className="fs-14 fw-normal">{batch.batch_id}</span>
                                                    <span className="fs-14 fw-normal dark-gray-500">Status: <span className="fs-14 fw-normal medium-gray-500">{batch.batch_status}</span></span>
                                                    <div className="create-by">
                                                        <img
                                                            src={batch.user_avatar || avatarDefault}
                                                            alt=""
                                                            className="w-28px h-28px rounded-circle object-fit-contain border"
                                                        />
                                                        <span className="fs-14 fw-normal ms-8px">{batch.user}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                </div>
            )}
        </>
    );
};

export { Search };
