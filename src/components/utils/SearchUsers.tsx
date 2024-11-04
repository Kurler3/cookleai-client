// import useSearchUsers from "@/hooks/users/useSearchUsers.hook";
import { IUser } from "@/types";
import { FC, useCallback, useRef, useState } from "react";
import useSearchUsers from "../../hooks/user/searchUsers.hook";
import UserItem from "./UserItem";

type IProps = {
    onAddUser: (user: IUser) => void;
    allAddedUserIds: number[];
};

const SearchUsers: FC<IProps> = ({ onAddUser, allAddedUserIds }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const [isUsersListOpen, setIsUsersListOpen] = useState<boolean>(false);

    // Use ref to handle focus
    const dropdownRef = useRef(null);

    const handleAddUser = useCallback(
        (user: IUser) => {

            // Add the user
            onAddUser(user);

            setTimeout(() => {
                // Clear the search bar
                setSearchValue("");

                setIsUsersListOpen(false);
            }, 1000);
        },
        [onAddUser]
    );

    // Hook that searchs users by email or by the id.
    const { foundUsers, isSearchingUsers, refetch, error } = useSearchUsers({
        searchValue,
    });

    return (
        <div
            className={`w-full relative dropdown ${isUsersListOpen && "dropdown-open"
                }`}
            ref={dropdownRef}
            onClick={() => {
                setIsUsersListOpen(true);
            }}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsUsersListOpen(false);
                }
            }}
        >
            {/* INPUT GROUP */}
            <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                    type="text"
                    className="grow bg-transparent focus:border-none focus:outline-none"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    onFocus={() => setIsUsersListOpen(true)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            {/* CURRENT RESULTS */}
            {isUsersListOpen && (
                <div
                    className="dropdown-content menu bg-base-300  mt-2 rounded-box z-[1] w-full p-4 shadow text-center flex flex-col justify-start items-center gap-2 "
                    tabIndex={-1}
                >
                    {error ? (
                        <>
                            There seems to be an error! Please try again
                            <button
                                className="btn btn-info"
                                onClick={() => refetch()}
                            >
                                Retry
                            </button>
                        </>
                    ) : isSearchingUsers ? (
                        <>
                            Searching...
                            <span className="loading loading-spinner"></span>
                        </>
                    ) : foundUsers ? (
                        foundUsers.length > 0 ? (
                            <>
                                {foundUsers.map((user) => {
                                    const isAlreadySelected =
                                        allAddedUserIds?.includes(user.id);

                                    return (
                                        <UserItem
                                            key={`searched_user_${user.id}`}
                                            user={user}
                                            onClickUser={
                                                !isAlreadySelected
                                                    ? handleAddUser
                                                    : undefined
                                            }
                                            isAlreadySelected={
                                                isAlreadySelected
                                            }
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>No users found :/</>
                        )
                    ) : (
                        <>
                            Search users by email! Attention: this is case
                            sensitive
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchUsers;
