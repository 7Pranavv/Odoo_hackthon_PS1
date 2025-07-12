export const UserRolesEnum = {
    ADMIN: 'admin',
    USER: 'user'
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const SwapStatusEnum = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled'
};

export const AvailableSwapStatuses = Object.values(SwapStatusEnum);

export const AvailabilityOptions = [
    'Weekdays',
    'Weekends',
    'Mornings',
    'Afternoons',
    'Evenings'
];

export const PlatformMessages = {
    NEW_FEATURE: 'New features have been added to Skill Swap!',
    MAINTENANCE: 'The platform will be under maintenance from 12 AM to 2 AM.',
    BANNED_USER: 'Your account has been suspended due to policy violations.'
};

export const FeedbackRatings = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
};
