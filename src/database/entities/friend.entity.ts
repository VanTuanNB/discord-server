export type IFriendEntity = {
    id: string;
    userId: string;
    friends?: string[]; // danh sách bạn bè
    acceptRequests?: string[]; // danh sach chờ chấp nhận lời mời kết bạn
    sendRequests?: string[]; // danh sách gửi yêu cầu kết bạn
    createdAt?: string;
    updatedAt?: string;
};
