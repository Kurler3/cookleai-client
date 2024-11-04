import { COOKBOOK_ROLES, ICookbookRole, IUser } from "@/types";
import { FC, ReactNode, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from "framer-motion";
import ImageWithLoader from "./ImageWithLoader";

type IProps = {
    user: IUser;
    role?: ICookbookRole;
    onClickUser?: (user: IUser) => void;
    onEditUserRole?: (userId: number, newRole: ICookbookRole) => void;
    isAlreadySelected: boolean;
    alreadySelectedIcon?: ReactNode;
    isShowRoleInput?: boolean;
};

const clickedDelay = 1000;

const UserItem: FC<IProps> = ({
    user,
    onClickUser,
    isAlreadySelected,
    alreadySelectedIcon,
    role,
    onEditUserRole,
    isShowRoleInput = false,
}) => {

    const [wasClicked, setWasClicked] = useState(false);

    const onClick = () => {
        if (wasClicked || !onClickUser) return;
        setWasClicked(true);
        onClickUser?.(user);
    };

    useEffect(() => {
        if (wasClicked) {
            const timeout = setTimeout(() => {
                setWasClicked(false);
            }, clickedDelay);

            return () => clearTimeout(timeout);
        }
    }, [wasClicked]);

    return (
        <div
            key={`searched_user_${user.id}`}
            // className="flex flex-row gap-4 items-center p-2 transition hover:bg-base-100 cursor-pointer rounded w-full tooltip tooltip-info"
            className={`
                flex flex-row gap-4 items-center p-2 transition-all ${!!onClickUser && "cursor-pointer"
                } rounded w-full tooltip tooltip-info
                hover:bg-base-200
            `}
            data-tip={`${isAlreadySelected ? "Already added" : "Add"} ${user.email
                }`}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <motion.div
                initial={{ scale: 1, rotate: 0 }}
                animate={wasClicked ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
            >
                {wasClicked || isAlreadySelected ? (
                    alreadySelectedIcon || (
                        <CheckCircleIcon className="text-green-500 text-[30px]" />
                    )
                ) : (
                    <AddIcon className="text-[30px]" />
                )}
            </motion.div>

            {/* Avatar */}
            <ImageWithLoader
                imageUrl={user.avatar}
                altTxt={user.email}
                imgClassName="w-10 h-10 rounded-full"
                loader={
                    <div className="h-10 w-10 rounded-full loading loading-spinner">
                    </div>
                }
            />

            {/* Email */}
            <div className="text-sm truncate w-full text-left">{user.email}</div>

            {/* ROLE INPUT */}
            {
                isShowRoleInput && role && (
                    <select 
                        className="select select-success w-fit"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            onEditUserRole?.(user.id, e.target.value as ICookbookRole);
                        }}
                    >
                        <option disabled>Select a role</option>

                        {
                            Object.values(COOKBOOK_ROLES).map((cookbookRole) => {

                                return (
                                    <option
                                        key={`cookbook_role_${cookbookRole}`}
                                    >
                                        {cookbookRole}
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }

        </div>
    );
};

export default UserItem;
