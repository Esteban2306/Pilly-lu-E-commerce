const UserAvatar = ({ name }: { name: string }) => {
    const initials = name
        .split(' ')
        .map(n => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2);

    return (
        <div
            className="
                flex items-center justify-center
                size-8 rounded-full
                border border-blue-300
                bg-transparent text-black
                font-semibold text-sm
                transition-all duration-300
                hover:scale-105
            "
        >
            {initials}
        </div>
    );
};

export default UserAvatar;