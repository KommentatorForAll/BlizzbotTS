interface Links {
}

interface Chatters {
    broadcaster: string[];
    vips: string[];
    moderators: string[];
    staff: string[];
    admins: string[];
    global_mods: string[];
    viewers: string[];
}

export interface ChatterInfo {
    _links: Links;
    chatter_count: number;
    chatters: Chatters;
}
