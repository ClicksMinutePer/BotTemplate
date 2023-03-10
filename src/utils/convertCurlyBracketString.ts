import type { GuildMember, GuildMemberManager } from "discord.js";

async function convertCurlyBracketString(
    str: string,
    memberID: string,
    memberName: string,
    serverName: string,
    members: GuildMemberManager
): Promise<string> {
    const memberCount = (await members.fetch()).size;
    const bots = (await members.fetch()).filter((m: GuildMember) => m.user.bot).size;
    str = str
        .replace("{member:mention}", memberID ? `<@${memberID}>` : "{member:mention}")
        .replace("{member:name}", memberName ? `${memberName}` : "{member:name}")
        .replace("{serverName}", serverName ? `${serverName}` : "{serverName}")
        .replace("{memberCount:all}", memberCount ? `${memberCount}` : "{memberCount}")
        .replace("{memberCount:bots}", bots ? `${bots}` : "{memberCount:bots}")
        .replace("{memberCount:humans}", memberCount && bots ? `${memberCount - bots}` : "{memberCount:humans}");

    return str;
}

export default convertCurlyBracketString;
