ESX = nil
TriggerEvent(
    "esx:getSharedObject",
    function(a)
        ESX = a
    end
)
AddEventHandler(
    "esx:playerLoaded",
    function(b, c)
        local d = b
        local identifier = c.getIdentifier()
        getOrGeneratePhoneNumber(
            identifier,
            function(e)
            end
        )
        getOrGenerateIBAN(
            identifier,
            function(f)
            end
        )
    end
)
local g = {}
local h = {}
local i = {}
local j = {}
local k = {}
local l = {}
local m = {}
local n = {}
local o = {}
function getPhoneRandomNumber()
    local p = 0
    local q = 6
    local r = math.random(11111111, 99999999)
    local s = string.format(p .. "" .. q .. "" .. r .. "")
    return s
end
function generateIBAN()
    local p = math.random(100, 999)
    local s = string.format(p)
    return s
end
function getNumberPhone(identifier)
    local result =
        exports.ghmattimysql:executeSync(
        "SELECT users.phone FROM users WHERE users.identifier = @identifier",
        {["@identifier"] = identifier}
    )
    if result[1] ~= nil then
        return result[1].phone
    end
    return nil
end
function getIBAN(identifier)
    local result =
        exports.ghmattimysql:executeSync(
        "SELECT users.iban FROM users WHERE users.identifier = @identifier",
        {["@identifier"] = identifier}
    )
    if result[1] ~= nil then
        return result[1].iban
    end
    return nil
end
function getOrGenerateIBAN(identifier, t)
    local identifier = identifier
    local u = getIBAN(identifier)
    if u == "0" or u == nil then
        repeat
            u = generateIBAN()
            local v = getPlayerFromIBAN(u)
        until v == nil
        exports.ghmattimysql:execute(
            "UPDATE users SET iban = @myIBAN WHERE identifier = @identifier",
            {["@myIBAN"] = u, ["@identifier"] = identifier},
            function()
                t(u)
            end
        )
    else
        t(u)
    end
end
function getOrGeneratePhoneNumber(identifier, t)
    local identifier = identifier
    local e = getNumberPhone(identifier)
    if e == "0" or e == nil then
        repeat
            e = getPhoneRandomNumber()
            local v = GetPlayerFromPhone(e)
        until v == nil
        exports.ghmattimysql:execute(
            "UPDATE users SET phone = @myPhoneNumber WHERE identifier = @identifier",
            {["@myPhoneNumber"] = e, ["@identifier"] = identifier},
            function()
                t(e)
            end
        )
    else
        t(e)
    end
end
RegisterServerEvent("s4-phone:saveTwitterToDatabase")
AddEventHandler(
    "s4-phone:saveTwitterToDatabase",
    function(w, x, y, z, A, B)
        local c = ESX.GetPlayerFromId(source)
        exports.ghmattimysql:execute(
            "INSERT INTO twitter_tweets (firstname, lastname, message, url, time, picture, owner) VALUES (@firstname, @lastname, @message, @url, @time, @picture, @owner)",
            {
                ["@firstname"] = w,
                ["@lastname"] = x,
                ["@message"] = y,
                ["@url"] = z,
                ["@time"] = A,
                ["@picture"] = B,
                ["@owner"] = c.identifier
            }
        )
    end
)
RegisterServerEvent("s4-phone:server:EmsSinyal")
AddEventHandler(
    "s4-phone:server:EmsSinyal",
    function(C)
        o[#o + 1] = {x = tonumber(C.x), y = tonumber(C.y)}
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            if Player ~= nil then
                if Player.job.name == Config.Meslekler.doktor then
                    TriggerClientEvent(
                        "mythic_notify:client:SendAlert",
                        E,
                        {
                            type = "error",
                            text = "Birilerinin Yardıma İhtiyacı Var! Telefonunuzdaki EMS Uygulamasını Kontrol Edin!",
                            style = {}
                        }
                    )
                end
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:s4share")
AddEventHandler(
    "s4-phone:server:s4share",
    function(F)
        local c = ESX.GetPlayerFromId(source)
        if F then
            F = 1
        else
            F = 0
        end
        ExecuteSql(false, 'UPDATE `users` SET `bt` = "' .. F .. '" WHERE  `identifier` = "' .. c.identifier .. '"')
    end
)
RegisterServerEvent("s4-phone:telver")
AddEventHandler(
    "s4-phone:telver",
    function()
        local c = ESX.GetPlayerFromId(source)
        local G = ESX.GetItems()
        TriggerClientEvent("inventory:client:ItemBox", source, G["phone"], "add", 1)
        local H =
            exports.ghmattimysql:executeSync("SELECT * FROM users WHERE identifier ='" .. c.identifier .. "'  ", {})
        if H[1] then
            c.addInventoryItem(
                "phone",
                1,
                false,
                {
                    isim = H[1].firstname .. " " .. H[1].lastname,
                    telno = H[1].phone,
                    aitlik = c.identifier,
                    durum = "kilitli"
                }
            )
        end
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetirVerilecekTelefon",
    function(source, t)
        local I = {}
        local c = ESX.GetPlayerFromId(source)
        local H =
            exports.ghmattimysql:executeSync("SELECT * FROM users WHERE identifier ='" .. c.identifier .. "'  ", {})
        if H[1] then
            I = {
                isim = H[1].firstname .. " " .. H[1].lastname,
                telno = H[1].phone,
                aitlik = c.identifier,
                durum = "kilitli"
            }
        end
        t(I)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GETEMS",
    function(source, t)
        t(o)
    end
)
RegisterServerEvent("s4-phone:server:DosyaGonder")
AddEventHandler(
    "s4-phone:server:DosyaGonder",
    function(J)
        TriggerClientEvent("s4-phone:client:DosyaAl", J.src, J)
    end
)
RegisterServerEvent("s4-phone:server:DosyaKaydet")
AddEventHandler(
    "s4-phone:server:DosyaKaydet",
    function(J)
        local c = ESX.GetPlayerFromId(source)
        local H = exports.ghmattimysql:executeSync("SELECT * FROM `s4_gallery` WHERE id ='" .. J.resim_url .. "'  ", {})
        if H[1].resim then
            ExecuteSql(
                false,
                "INSERT INTO `s4_gallery` (`identifier`, `resim`) VALUES ('" ..
                    c.identifier .. "', '" .. H[1].resim .. "' )"
            )
        end
    end
)
RegisterNetEvent("s4-phone:server:PayBilling")
AddEventHandler(
    "s4-phone:server:PayBilling",
    function(K)
        local src = source
        local c = ESX.GetPlayerFromId(src)
        local K = K
        local L = exports.ghmattimysql:executeSync("SELECT * FROM billing WHERE id='" .. K .. "' ", {})
        if L[1].amount < c.getAccount("bank").money then
            c.removeAccountMoney("bank", L[1].amount)
            exports.ghmattimysql:executeSync("DELETE FROM billing WHERE id='" .. K .. "'  ", {})
        end
    end
)
RegisterServerEvent("s4-phone:sifrekirtelefon")
AddEventHandler(
    "s4-phone:sifrekirtelefon",
    function(M)
        local c = ESX.GetPlayerFromId(source)
        local N = c.getInventory(true)
        for O = 1, #N, 1 do
            if N[O].slot == M then
                local P = {}
                P.isim = N[O].info.isim
                P.telno = N[O].info.telno
                P.aitlik = N[O].info.aitlik
                P.durum = "1"
                c.addInventoryItem("phone", 1, false, P)
                c.removeInventoryItem("phone", 1, M)
                break
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:AddAdvert")
AddEventHandler("s4-phone:server:AddAdvert",function(Q, R)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        local S = Player.identifier
        local T = GetCharacter(src)
        local U = "@" .. T.firstname .. "" .. T.lastname
        local V = T.phone
        print(json.encode(T))
        if R then
            ExecuteSql(
                false,
                "INSERT INTO `s4_yellowpages` (`owner`, `mesaj`, `isim`, `telno`, `resim`) VALUES ('" ..
                    Player.identifier .. "', '" .. Q .. "', '" .. U .. "' , '" .. V .. "' , '" .. R .. "' )"
            )
        else
            ExecuteSql(
                false,
                "INSERT INTO `s4_yellowpages` (`owner`, `mesaj`, `isim`, `telno` ) VALUES ('" ..
                    Player.identifier .. "', '" .. Q .. "', '" .. U .. "' , '" .. V .. "'  )"
            )
        end
    end
)
function GetOnlineStatus(V)
    local W = GetPlayerFromPhone(V)
    local X = false
    if W ~= nil then
        X = true
    end
    return X
end
RegisterServerEvent("s4-phone:server:updateForEveryone")
AddEventHandler(
    "s4-phone:server:updateForEveryone",
    function(Y)
        local src = source
        TriggerClientEvent("s4-phone:updateForEveryone", -1, Y)
    end
)
RegisterServerEvent("s4-phone:server:updateidForEveryone")
AddEventHandler(
    "s4-phone:server:updateidForEveryone",
    function()
        TriggerClientEvent("s4-phone:updateidForEveryone", -1)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetPhoneData",
    function(source, t, Z)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        if not Z then
            Z = Player.identifier
        end
        local T = GetCharacter(src)
        if Player ~= nil then
            local _ = {
                Applications = {},
                PlayerContacts = {},
                MentionedTweets = {},
                Chats = {},
                Hashtags = {},
                SelfTweets = {},
                Invoices = {},
                Garage = {},
                Mails = {},
                Adverts = {},
                CryptoTransactions = {},
                Tweets = {}
            }
            _.Adverts = m
            ExecuteSql(
                false,
                "SELECT * FROM player_contacts WHERE `identifier` = '" .. Z .. "' ORDER BY `name` ASC",
                function(result)
                    local a0 = {}
                    if result[1] ~= nil then
                        for D, E in pairs(result) do
                            E.status = GetOnlineStatus(E.number)
                        end
                        _.PlayerContacts = result
                    end
                    ExecuteSql(
                        false,
                        "SELECT * FROM twitter_tweets",
                        function(result)
                            if result[1] ~= nil then
                                _.Tweets = result
                            else
                                _.Tweets = nil
                            end
                            ExecuteSql(
                                false,
                                "SELECT * FROM twitter_tweets WHERE owner = '" .. Z .. "'",
                                function(result)
                                    if result ~= nil then
                                        _.SelfTweets = result
                                    end
                                    ExecuteSql(
                                        false,
                                        "SELECT * FROM owned_vehicles WHERE `owner` = '" .. Z .. "'",
                                        function(a1)
                                            if a1[1] ~= nil then
                                                _.Garage = a1
                                            end
                                            ExecuteSql(
                                                false,
                                                'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                                                    Z .. '" ORDER BY `date` ASC',
                                                function(a2)
                                                    if a2[1] ~= nil then
                                                        for D, E in pairs(a2) do
                                                            if a2[D].button ~= nil then
                                                                a2[D].button = json.decode(a2[D].button)
                                                            end
                                                        end
                                                        _.Mails = a2
                                                    end
                                                    ExecuteSql(
                                                        false,
                                                        "SELECT * FROM phone_messages WHERE `identifier` = '" ..
                                                            Z .. "'",
                                                        function(a3)
                                                            if a3 ~= nil and next(a3) ~= nil then
                                                                _.Chats = a3
                                                            end
                                                            if i[Player.identifier] ~= nil then
                                                                _.Applications = i[Player.identifier]
                                                            end
                                                            if j[Player.identifier] ~= nil then
                                                                _.MentionedTweets = j[Player.identifier]
                                                            end
                                                            if k ~= nil and next(k) ~= nil then
                                                                _.Hashtags = k
                                                            end
                                                            _.charinfo = GetCharacter(src)
                                                            if Config.UseESXBilling then
                                                                ExecuteSql(
                                                                    false,
                                                                    "SELECT * FROM billing  WHERE `identifier` = '" ..
                                                                        Z .. "'",
                                                                    function(a4)
                                                                        if a4[1] ~= nil then
                                                                            for D, E in pairs(a4) do
                                                                                local a5 =
                                                                                    ESX.GetPlayerFromIdentifier(
                                                                                    E.sender
                                                                                )
                                                                                if a5 ~= nil then
                                                                                    E.number =
                                                                                        GetCharacter(a5.source).phone
                                                                                else
                                                                                    ExecuteSql(
                                                                                        true,
                                                                                        "SELECT * FROM `users` WHERE `identifier` = '" ..
                                                                                            E.sender .. "'",
                                                                                        function(a6)
                                                                                            if a6[1] ~= nil then
                                                                                                E.number = a6[1].phone
                                                                                            else
                                                                                                E.number = nil
                                                                                            end
                                                                                        end
                                                                                    )
                                                                                end
                                                                            end
                                                                            _.Invoices = a4
                                                                        end
                                                                        t(_)
                                                                    end
                                                                )
                                                            else
                                                                _.Invoices = {}
                                                                t(_)
                                                            end
                                                        end
                                                    )
                                                end
                                            )
                                        end
                                    )
                                end
                            )
                        end
                    )
                end
            )
        end
    end
)
RegisterServerEvent("s4-phone:deleteTweet")
AddEventHandler(
    "s4-phone:deleteTweet",
    function(v)
        local c = ESX.GetPlayerFromId(source)
        exports.ghmattimysql:execute(
            "DELETE FROM twitter_tweets WHERE owner = @owner AND id = @id",
            {["@owner"] = c.identifier, ["@id"] = v}
        )
    end
)
RegisterServerEvent("s4-phone:server:kaydetResim")
AddEventHandler(
    "s4-phone:server:kaydetResim",
    function(a7)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(
            false,
            "INSERT INTO `s4_gallery` (`identifier`, `resim`) VALUES ('" .. c.identifier .. "', '" .. a7 .. "' )"
        )
    end
)
RegisterServerEvent("s4-phone:server:PaylasInstaPost")
AddEventHandler(
    "s4-phone:server:PaylasInstaPost",
    function(v, a8, a9)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(
            false,
            "SELECT * FROM `s4_gallery` WHERE `identifier` = '" .. c.identifier .. "' AND `id` = '" .. v .. "' ",
            function(result)
                if result[1] ~= nil then
                    ExecuteSql(
                        false,
                        "INSERT INTO `s4_instagram_postlar` (`owner`, `foto`, `efekt`, `yazi`) VALUES ('" ..
                            c.identifier .. "', '" .. result[1].resim .. "' , '" .. a8 .. "' , '" .. a9 .. "' )"
                    )
                end
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:SilResim")
AddEventHandler(
    "s4-phone:server:SilResim",
    function(a7)
        local Player = ESX.GetPlayerFromId(source)
        exports.ghmattimysql:execute(
            "DELETE FROM s4_gallery WHERE identifier = @identifier AND id = @resim",
            {["@identifier"] = Player.identifier, ["@resim"] = a7}
        )
    end
)
RegisterServerEvent("s4-phone:server:ResimSilinsta")
AddEventHandler(
    "s4-phone:server:ResimSilinsta",
    function(a7)
        local Player = ESX.GetPlayerFromId(source)
        exports.ghmattimysql:execute(
            "DELETE FROM s4_instagram_postlar WHERE owner = @identifier AND id = @resim",
            {["@identifier"] = Player.identifier, ["@resim"] = a7}
        )
    end
)
RegisterServerEvent("s4-phone:server:NotEkle")
AddEventHandler(
    "s4-phone:server:NotEkle",
    function(aa, ab)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(
            false,
            "INSERT INTO `s4_not` (`identifier`, `baslik`, `aciklama`) VALUES ('" ..
                c.identifier .. "', '" .. aa .. "', '" .. ab .. "' )"
        )
    end
)
RegisterServerEvent("s4-phone:server:NotGuncelle")
AddEventHandler(
    "s4-phone:server:NotGuncelle",
    function(v, aa, ab)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(
            false,
            'UPDATE `s4_not` SET `baslik` = "' ..
                aa ..
                    '", `aciklama` = "' ..
                        ab .. '" WHERE `id` = "' .. v .. '" AND `identifier` = "' .. c.identifier .. '"'
        )
    end
)
RegisterServerEvent("s4-phone:server:biyoguncelle")
AddEventHandler(
    "s4-phone:server:biyoguncelle",
    function(ac)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(
            false,
            'UPDATE `users` SET `biyografi` = "' .. ac .. '" WHERE  `identifier` = "' .. c.identifier .. '"'
        )
    end
)
RegisterServerEvent("s4-phone:server:NotSil")
AddEventHandler(
    "s4-phone:server:NotSil",
    function(v)
        local c = ESX.GetPlayerFromId(source)
        ExecuteSql(false, 'DELETE FROM `s4_not` WHERE `id` = "' .. v .. '" AND `identifier` = "' .. c.identifier .. '"')
    end
)
RegisterServerEvent("s4-phone:server:Takip_instagram")
AddEventHandler(
    "s4-phone:server:Takip_instagram",
    function(ad, ae)
        local c = ESX.GetPlayerFromId(source)
        if ad == "1" then
            ExecuteSql(
                false,
                "INSERT INTO `s4_instagram_takip` (`takip_eden`, `takip_edilen`) VALUES ('" ..
                    c.identifier .. "', '" .. ae .. "' )"
            )
        else
            ExecuteSql(
                false,
                'DELETE FROM `s4_instagram_takip` WHERE `takip_edilen` = "' ..
                    ae .. '" AND `takip_eden` = "' .. c.identifier .. '"'
            )
        end
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCallState",
    function(source, t, af)
        local W = GetPlayerFromPhone(af.number)
        if W ~= nil then
            if l[W.identifier] ~= nil then
                if l[W.identifier].inCall then
                    t(false, true)
                else
                    t(true, true)
                end
            else
                t(true, true)
            end
        else
            t(false, false)
        end
    end
)
RegisterServerEvent("s4-phone:server:SetCallState")
AddEventHandler(
    "s4-phone:server:SetCallState",
    function(ag)
        local src = source
        local a5 = ESX.GetPlayerFromId(src)
        if l[a5.identifier] ~= nil then
            l[a5.identifier].inCall = ag
        else
            l[a5.identifier] = {}
            l[a5.identifier].inCall = ag
        end
    end
)
RegisterServerEvent("s4-phone:server:RemoveMail")
AddEventHandler(
    "s4-phone:server:RemoveMail",
    function(ah)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            'DELETE FROM `player_mails` WHERE `mailid` = "' ..
                ah .. '" AND `identifier` = "' .. Player.identifier .. '"'
        )
        SetTimeout(
            100,
            function()
                ExecuteSql(
                    false,
                    'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                        Player.identifier .. '" ORDER BY `date` ASC',
                    function(a2)
                        if a2[1] ~= nil then
                            for D, E in pairs(a2) do
                                if a2[D].button ~= nil then
                                    a2[D].button = json.decode(a2[D].button)
                                end
                            end
                        end
                        TriggerClientEvent("s4-phone:client:UpdateMails", src, a2)
                    end
                )
            end
        )
    end
)
function GenerateMailId()
    return math.random(111111, 999999)
end
RegisterServerEvent("s4-phone:server:sendNewMail")
AddEventHandler(
    "s4-phone:server:sendNewMail",
    function(ai)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        if ai.button == nil then
            ExecuteSql(
                false,
                "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES ('" ..
                    Player.identifier ..
                        "', '" ..
                            ai.sender ..
                                "', '" .. ai.subject .. "', '" .. ai.message .. "', '" .. GenerateMailId() .. "', '0')"
            )
        else
            ExecuteSql(
                false,
                "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES ('" ..
                    Player.identifier ..
                        "', '" ..
                            ai.sender ..
                                "', '" ..
                                    ai.subject ..
                                        "', '" ..
                                            ai.message ..
                                                "', '" ..
                                                    GenerateMailId() .. "', '0', '" .. json.encode(ai.button) .. "')"
            )
        end
        TriggerClientEvent("s4-phone:client:NewMailNotify", src, ai)
        SetTimeout(
            200,
            function()
                ExecuteSql(
                    false,
                    'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                        Player.identifier .. '" ORDER BY `date` DESC',
                    function(a2)
                        if a2[1] ~= nil then
                            for D, E in pairs(a2) do
                                if a2[D].button ~= nil then
                                    a2[D].button = json.decode(a2[D].button)
                                end
                            end
                        end
                        TriggerClientEvent("s4-phone:client:UpdateMails", src, a2)
                    end
                )
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:sendNewMailToOffline")
AddEventHandler(
    "s4-phone:server:sendNewMailToOffline",
    function(aj, ai)
        local Player = ESX.GetPlayerFromIdentifier(aj)
        if Player ~= nil then
            local src = Player.source
            if ai.button == nil then
                ExecuteSql(
                    false,
                    "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES ('" ..
                        Player.identifier ..
                            "', '" ..
                                ai.sender ..
                                    "', '" ..
                                        ai.subject .. "', '" .. ai.message .. "', '" .. GenerateMailId() .. "', '0')"
                )
                TriggerClientEvent("s4-phone:client:NewMailNotify", src, ai)
            else
                ExecuteSql(
                    false,
                    "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES ('" ..
                        Player.identifier ..
                            "', '" ..
                                ai.sender ..
                                    "', '" ..
                                        ai.subject ..
                                            "', '" ..
                                                ai.message ..
                                                    "', '" ..
                                                        GenerateMailId() ..
                                                            "', '0', '" .. json.encode(ai.button) .. "')"
                )
                TriggerClientEvent("s4-phone:client:NewMailNotify", src, ai)
            end
            SetTimeout(
                200,
                function()
                    ExecuteSql(
                        false,
                        'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                            Player.identifier .. '" ORDER BY `date` DESC',
                        function(a2)
                            if a2[1] ~= nil then
                                for D, E in pairs(a2) do
                                    if a2[D].button ~= nil then
                                        a2[D].button = json.decode(a2[D].button)
                                    end
                                end
                            end
                            TriggerClientEvent("s4-phone:client:UpdateMails", src, a2)
                        end
                    )
                end
            )
        else
            if ai.button == nil then
                ExecuteSql(
                    false,
                    "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES ('" ..
                        identifier ..
                            "', '" ..
                                ai.sender ..
                                    "', '" ..
                                        ai.subject .. "', '" .. ai.message .. "', '" .. GenerateMailId() .. "', '0')"
                )
            else
                ExecuteSql(
                    false,
                    "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES ('" ..
                        identifier ..
                            "', '" ..
                                ai.sender ..
                                    "', '" ..
                                        ai.subject ..
                                            "', '" ..
                                                ai.message ..
                                                    "', '" ..
                                                        GenerateMailId() ..
                                                            "', '0', '" .. json.encode(ai.button) .. "')"
                )
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:sendNewEventMail")
AddEventHandler(
    "s4-phone:server:sendNewEventMail",
    function(aj, ai)
        if ai.button == nil then
            ExecuteSql(
                false,
                "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES ('" ..
                    identifier ..
                        "', '" ..
                            ai.sender ..
                                "', '" .. ai.subject .. "', '" .. ai.message .. "', '" .. GenerateMailId() .. "', '0')"
            )
        else
            ExecuteSql(
                false,
                "INSERT INTO `player_mails` (`identifier`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES ('" ..
                    identifier ..
                        "', '" ..
                            ai.sender ..
                                "', '" ..
                                    ai.subject ..
                                        "', '" ..
                                            ai.message ..
                                                "', '" ..
                                                    GenerateMailId() .. "', '0', '" .. json.encode(ai.button) .. "')"
            )
        end
        SetTimeout(
            200,
            function()
                ExecuteSql(
                    false,
                    'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                        Player.identifier .. '" ORDER BY `date` DESC',
                    function(a2)
                        if a2[1] ~= nil then
                            for D, E in pairs(a2) do
                                if a2[D].button ~= nil then
                                    a2[D].button = json.decode(a2[D].button)
                                end
                            end
                        end
                        TriggerClientEvent("s4-phone:client:UpdateMails", src, a2)
                    end
                )
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:ClearButtonData")
AddEventHandler(
    "s4-phone:server:ClearButtonData",
    function(ak)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            'UPDATE `player_mails` SET `button` = "" WHERE `mailid` = "' ..
                ak .. '" AND `identifier` = "' .. Player.identifier .. '"'
        )
        SetTimeout(
            200,
            function()
                ExecuteSql(
                    false,
                    'SELECT * FROM `player_mails` WHERE `identifier` = "' ..
                        Player.identifier .. '" ORDER BY `date` DESC',
                    function(a2)
                        if a2[1] ~= nil then
                            for D, E in pairs(a2) do
                                if a2[D].button ~= nil then
                                    a2[D].button = json.decode(a2[D].button)
                                end
                            end
                        end
                        TriggerClientEvent("s4-phone:client:UpdateMails", src, a2)
                    end
                )
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:MentionedPlayer")
AddEventHandler(
    "s4-phone:server:MentionedPlayer",
    function(w, al, am)
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            local T = GetCharacter(E)
            if Player ~= nil then
                if T.firstname == w and T.lastname == al then
                    g.SetPhoneAlerts(Player.identifier, "twitter")
                    g.AddMentionedTweet(Player.identifier, am)
                    TriggerClientEvent(
                        "s4-phone:client:GetMentioned",
                        Player.source,
                        am,
                        i[Player.identifier]["twitter"]
                    )
                else
                    ExecuteSql(
                        false,
                        "SELECT * FROM `users` WHERE `firstname`='" .. w .. "' AND `lastname`='" .. al .. "'",
                        function(result)
                            if result[1] ~= nil then
                                local an = result[1].identifier
                                g.SetPhoneAlerts(an, "twitter")
                                g.AddMentionedTweet(an, am)
                            end
                        end
                    )
                end
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:CallContact")
AddEventHandler(
    "s4-phone:server:CallContact",
    function(ao, ap, aq)
        local src = source
        local a5 = ESX.GetPlayerFromId(src)
        local W = GetPlayerFromPhone(ao.number)
        local T = GetCharacter(src)
        if W ~= nil then
            TriggerClientEvent("s4-phone:client:GetCalled", W.source, T.phone, ap, aq)
        end
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetBankData",
    function(source, t)
        local src = source
        local c = ESX.GetPlayerFromId(src)
        local T = GetCharacter(src)
        t({bank = c.getAccount("bank").money, iban = T.iban, username = T.firstname .. " " .. T.lastname})
    end
)
ESX.RegisterServerCallback(
    "s4-phone:envtelefonlar",
    function(source, t)
        local src = source
        local c = ESX.GetPlayerFromId(src)
        local N = c.getInventory(true)
        t(N)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:CanPayInvoice",
    function(source, t, ar)
        local src = source
        local c = ESX.GetPlayerFromId(src)
        t(c.getAccount("bank").money >= ar)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:buybm",
    function(source, t, as)
        local c = ESX.GetPlayerFromId(source)
        if tonumber(as) < c.getAccount("bank").money then
            t(true)
        else
            t(false)
        end
    end
)
RegisterServerEvent("s4-phone:server:givebmitem")
AddEventHandler(
    "s4-phone:server:givebmitem",
    function(at)
        local c = ESX.GetPlayerFromId(source)
        local G = ESX.GetItems()
        if at then
            TriggerClientEvent("inventory:client:ItemBox", source, G[at], "add", 1)
            c.addInventoryItem(at, 1)
        end
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetInvoices",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local au = {}
        ExecuteSql(
            false,
            "SELECT * FROM `billing` WHERE `identifier` = '" .. Player.identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local av = nil
                        local a5 = ESX.GetPlayerFromIdentifier(E.sender)
                        if a5 ~= nil then
                            av = GetCharacter(a5.source).phone
                        else
                            ExecuteSql(
                                true,
                                "SELECT * FROM `users` WHERE `identifier` = '" .. E.sender .. "'",
                                function(a6)
                                    if a6[1] ~= nil then
                                        av = a6[1].phone
                                    else
                                        av = nil
                                    end
                                end
                            )
                        end
                        local aw = {}
                        aw = {label = E.label, amount = E.amount, number = av, id = E.id}
                        table.insert(au, aw)
                    end
                    t(au)
                else
                    t(nil)
                end
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:UpdateHashtags")
AddEventHandler(
    "s4-phone:server:UpdateHashtags",
    function(ax, ay)
        if k[ax] ~= nil and next(k[ax]) ~= nil then
            table.insert(k[ax].messages, ay)
        else
            k[ax] = {hashtag = ax, messages = {}}
            table.insert(k[ax].messages, ay)
        end
        TriggerClientEvent("s4-phone:client:UpdateHashtags", -1, ax, ay)
    end
)
g.AddMentionedTweet = function(identifier, az)
    if j[identifier] == nil then
        j[identifier] = {}
    end
    table.insert(j[identifier], az)
end
g.SetPhoneAlerts = function(identifier, aA, aB)
    if identifier ~= nil and aA ~= nil then
        if i[identifier] == nil then
            i[identifier] = {}
            if i[identifier][aA] == nil then
                if aB == nil then
                    i[identifier][aA] = 1
                else
                    i[identifier][aA] = aB
                end
            end
        else
            if i[identifier][aA] == nil then
                if aB == nil then
                    i[identifier][aA] = 1
                else
                    i[identifier][aA] = 0
                end
            else
                if aB == nil then
                    i[identifier][aA] = i[identifier][aA] + 1
                else
                    i[identifier][aA] = i[identifier][aA] + 0
                end
            end
        end
    end
end
ESX.RegisterServerCallback(
    "s4-phone:server:GetContactPictures",
    function(source, t, aC)
        for D, E in pairs(aC) do
            local Player = ESX.GetPlayerFromIdentifier(E.number)
            ExecuteSql(
                false,
                "SELECT * FROM `users` WHERE `phone`='" .. E.number .. "'",
                function(result)
                    if result[1] ~= nil then
                        if result[1].profilepicture ~= nil then
                            E.picture = result[1].profilepicture
                        else
                            E.picture = "default"
                        end
                    end
                end
            )
        end
        SetTimeout(
            100,
            function()
                t(aC)
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetContactPicture",
    function(source, t, aD)
        ExecuteSql(
            false,
            "SELECT * FROM `users` WHERE `phone`='" .. aD.number .. "'",
            function(result)
                if result[1] and result[1].background then
                    aD.picture = result[1].background
                    t(aD)
                else
                    aD.picture = "default"
                    t(aD)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetPicture",
    function(source, t, V)
        local Player = GetPlayerFromPhone(V)
        local aE = nil
        ExecuteSql(
            false,
            "SELECT * FROM `users` WHERE `phone`='" .. V .. "'",
            function(result)
                if result[1] ~= nil then
                    if result[1].profilepicture ~= nil then
                        aE = result[1].profilepicture
                    else
                        aE = "default"
                    end
                    t(aE)
                else
                    t(nil)
                end
            end
        )
    end
)
RegisterServerEvent("s4-phone:server:SetPhoneAlerts")
AddEventHandler(
    "s4-phone:server:SetPhoneAlerts",
    function(aA, aB)
        local src = source
        local S = ESX.GetPlayerFromId(src).identifier
        g.SetPhoneAlerts(S, aA, aB)
    end
)
RegisterServerEvent("s4-phone:server:UpdateTweets")
AddEventHandler(
    "s4-phone:server:UpdateTweets",
    function(az, type)
        h = NewTweets
        local aF = az
        local src = source
        TriggerClientEvent("s4-phone:client:UpdateTweets", -1, src, aF, type)
    end
)
RegisterServerEvent("s4-phone:server:TransferMoney")
AddEventHandler(
    "s4-phone:server:TransferMoney",
    function(f, ar)
        local src = source
        local aG = ESX.GetPlayerFromId(src)
        local f = f
        local ar = ar
        getSourceFromIban(
            f,
            function(aH)
                local aI = ESX.GetPlayerFromId(aH)
                if aI then
                    aI.addAccountMoney("bank", ar)
                    aG.removeAccountMoney("bank", ar)
                else
                    aG.removeAccountMoney("bank", ar)
                    ExecuteSql(
                        false,
                        "UPDATE `users` SET `bank` = '" ..
                            result[1].bank + ar .. "' WHERE `identifier` = '" .. result[1].identifier .. "'"
                    )
                end
            end
        )
    end
)
function getSourceFromIban(f, t)
    local aJ = ESX.GetPlayers()
    for D, aK in pairs(aJ) do
        local identifier = GetPlayerIdentifiers(aK)[1]
        user_datastore =
            exports.ghmattimysql:executeSync("SELECT iban FROM users WHERE identifier='" .. identifier .. "' ", {})
        if user_datastore and user_datastore[1] then
            if user_datastore[1].iban == f then
                t(aK)
                return
            end
        end
    end
    t(nil)
end
RegisterServerEvent("s4-phone:server:EditContact")
AddEventHandler(
    "s4-phone:server:EditContact",
    function(aL, aM, aN, aO, aP, aQ)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            "UPDATE `player_contacts` SET `name` = '" ..
                aL ..
                    "', `number` = '" ..
                        aM ..
                            "', `iban` = '" ..
                                aN ..
                                    "' WHERE `identifier` = '" ..
                                        Player.identifier ..
                                            "' AND `name` = '" .. aO .. "' AND `number` = '" .. aP .. "'"
        )
    end
)
RegisterServerEvent("s4-phone:server:RemoveContact")
AddEventHandler(
    "s4-phone:server:RemoveContact",
    function(aR, aS)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            "DELETE FROM `player_contacts` WHERE `name` = '" ..
                aR .. "' AND `number` = '" .. aS .. "' AND `identifier` = '" .. Player.identifier .. "'"
        )
    end
)
RegisterServerEvent("s4-phone:server:AddNewContact")
AddEventHandler(
    "s4-phone:server:AddNewContact",
    function(aT, V, f)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            "INSERT INTO `player_contacts` (`identifier`, `name`, `number`, `iban`) VALUES ('" ..
                Player.identifier .. "', '" .. tostring(aT) .. "', '" .. tostring(V) .. "', '" .. tostring(f) .. "')"
        )
    end
)
RegisterServerEvent("s4-phone:server:UpdateMessages")
AddEventHandler(
    "s4-phone:server:UpdateMessages",
    function(aU, aV, aW)
        local src = source
        local aX = ESX.GetPlayerFromId(src)
        local aY = GetCharacter(src)
        local Player =
            exports.ghmattimysql:executeSync("SELECT identifier,phone FROM `users` WHERE `phone`='" .. aV .. "' ", {})
        if Player[1] ~= nil then
            local ao = GetPlayerFromPhone(Player[1].phone)
            if ao ~= nil then
                local aZ = GetCharacter(ao.source)
                local aD =
                    exports.ghmattimysql:executeSync(
                    "SELECT * FROM phone_messages WHERE `identifier` = '" ..
                        aX.identifier .. "' AND number = '" .. aV .. "' ",
                    {}
                )
                if aD[1] ~= nil then
                    exports.ghmattimysql:execute(
                        "UPDATE phone_messages SET `messages` = '" ..
                            json.encode(aU) ..
                                "' WHERE `identifier` = '" .. ao.identifier .. "' AND number = '" .. aY.phone .. "' ",
                        {}
                    )
                    exports.ghmattimysql:execute(
                        "UPDATE phone_messages SET `messages` = '" ..
                            json.encode(aU) ..
                                "' WHERE `identifier` = '" .. aX.identifier .. "' AND number = '" .. aZ.phone .. "' ",
                        {}
                    )
                    TriggerClientEvent("s4-phone:client:UpdateMessages", ao.source, aU, aY.phone, false)
                else
                    exports.ghmattimysql:execute(
                        "INSERT INTO phone_messages (identifier, number, messages) VALUES ('" ..
                            ao.identifier .. "', '" .. aY.phone .. "', '" .. json.encode(aU) .. "')",
                        {}
                    )
                    exports.ghmattimysql:execute(
                        "INSERT INTO phone_messages (identifier, number, messages) VALUES ('" ..
                            aX.identifier .. "', '" .. aZ.phone .. "', '" .. json.encode(aU) .. "')",
                        {}
                    )
                    TriggerClientEvent("s4-phone:client:UpdateMessages", ao.source, aU, aY.phone, true)
                end
            else
                local aD =
                    exports.ghmattimysql:executeSync(
                    "SELECT * FROM `phone_messages` WHERE `identifier` = '" ..
                        aX.identifier .. "' AND `number` = '" .. aV .. "'",
                    {}
                )
                if aD[1] ~= nil then
                    exports.ghmattimysql:execute(
                        "UPDATE phone_messages SET `messages` = '" ..
                            json.encode(aU) ..
                                "' WHERE `identifier` = '" ..
                                    Player[1].identifier .. "' AND number = '" .. aY.phone .. "' ",
                        {}
                    )
                    exports.ghmattimysql:execute(
                        "UPDATE phone_messages SET `messages` = '" ..
                            json.encode(aU) ..
                                "' WHERE `identifier` = '" ..
                                    aX.identifier .. "' AND number = '" .. Player[1].phone .. "' ",
                        {}
                    )
                else
                    exports.ghmattimysql:execute(
                        "INSERT INTO phone_messages (identifier, number, messages) VALUES ('" ..
                            Player[1].identifier .. "', '" .. aY.phone .. "', '" .. json.encode(aU) .. "')",
                        {}
                    )
                    exports.ghmattimysql:execute(
                        "INSERT INTO phone_messages (identifier, number, messages) VALUES ('" ..
                            aX.identifier .. "', '" .. Player[1].phone .. "', '" .. json.encode(aU) .. "')",
                        {}
                    )
                end
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:AddRecentCall")
AddEventHandler(
    "s4-phone:server:AddRecentCall",
    function(type, a_)
        local src = source
        local a5 = ESX.GetPlayerFromId(src)
        local T = GetCharacter(src)
        local b0 = os.date("%H")
        local b1 = os.date("%M")
        local b2 = b0 .. ":" .. b1
        TriggerClientEvent("s4-phone:client:AddRecentCall", src, a_, b2, type)
        local b3 = GetPlayerFromPhone(a_.number)
        if b3 ~= nil then
            TriggerClientEvent(
                "s4-phone:client:AddRecentCall",
                b3.source,
                {name = T.firstname .. " " .. T.lastname, number = T.phone, anonymous = anonymous},
                b2,
                "outgoing"
            )
        end
    end
)
RegisterServerEvent("s4-phone:server:CancelCall")
AddEventHandler(
    "s4-phone:server:CancelCall",
    function(af)
        local a5 = GetPlayerFromPhone(af.TargetData.number)
        if a5 ~= nil then
            TriggerClientEvent("s4-phone:client:CancelCall", a5.source)
        end
    end
)
RegisterServerEvent("s4-phone:server:AnswerCall")
AddEventHandler(
    "s4-phone:server:AnswerCall",
    function(b4)
        local a5 = GetPlayerFromPhone(b4.TargetData.number)
        if a5 ~= nil then
            TriggerClientEvent("s4-phone:client:AnswerCall", a5.source)
        end
    end
)
RegisterServerEvent("s4:AnswerCall")
AddEventHandler(
    "s4:AnswerCall",
    function(a5, b5)
        local b6 = GetPlayerFromPhone(b5.TargetData.number)
        if a5 ~= nil then
            if b6 ~= nil then
                exports["saltychat"]:EstablishCall(b6.source, a5)
                exports["saltychat"]:EstablishCall(a5, b6.source)
            end
        end
    end
)
RegisterServerEvent("s4:CancelCall")
AddEventHandler(
    "s4:CancelCall",
    function(a5, b5)
        local b6 = GetPlayerFromPhone(b5.TargetData.number)
        if a5 ~= nil then
            if b6 ~= nil then
                exports["saltychat"]:EndCall(b6.source, a5)
                exports["saltychat"]:EndCall(a5, b6.source)
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:SaveMetaData")
AddEventHandler(
    "s4-phone:server:SaveMetaData",
    function(b7, a_)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        if a_ and b7 then
            if type(a_) == "table" then
                ExecuteSql(
                    false,
                    "UPDATE `users` SET `" ..
                        b7 .. "` = '" .. json.encode(a_) .. "' WHERE `identifier` = '" .. Player.identifier .. "'"
                )
            else
                ExecuteSql(
                    false,
                    "UPDATE `users` SET `" ..
                        b7 .. "` = '" .. a_ .. "' WHERE `identifier` = '" .. Player.identifier .. "'"
                )
            end
        end
    end
)
function escape_sqli(source)
    local b8 = {['"'] = '\\"', ["'"] = "\\'"}
    return source:gsub('[\'"]', b8)
end
ESX.RegisterServerCallback(
    "s4-phone:server:FetchResult",
    function(source, t, b9)
        local src = source
        local b9 = escape_sqli(b9)
        local ba = {}
        local bb = {}
        local T = GetCharacter(src)
        ExecuteSql(
            false,
            "SELECT * FROM `users` WHERE firstname LIKE '%" .. b9 .. "%'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bc = false
                        local bd = false
                        local be = true
                        if Config.UseESXLicense then
                            CheckLicense(
                                E.identifier,
                                "weapon",
                                function(bf)
                                    if bf then
                                        bd = true
                                    end
                                    CheckLicense(
                                        E.identifier,
                                        "drive",
                                        function(bf)
                                            if bf then
                                                bc = true
                                            end
                                            be = false
                                        end
                                    )
                                end
                            )
                        else
                            be = false
                        end
                        while be do
                            Wait(1)
                        end
                        table.insert(
                            ba,
                            {
                                identifier = E.identifier,
                                firstname = T.firstname,
                                lastname = T.lastname,
                                birthdate = T.dateofbirth,
                                phone = T.phone,
                                gender = T.sex,
                                weaponlicense = bd,
                                driverlicense = bc
                            }
                        )
                    end
                    t(ba)
                else
                    t(nil)
                end
            end
        )
    end
)
function CheckLicense(bg, type, t)
    local bg = bg
    if bg then
        exports.ghmattimysql:execute(
            "SELECT COUNT(*) as count FROM user_licenses WHERE type = @type AND owner = @owner",
            {["@type"] = type, ["@owner"] = bg},
            function(result)
                if tonumber(result[1].count) > 0 then
                    t(true)
                else
                    t(false)
                end
            end
        )
    else
        t(false)
    end
end
ESX.RegisterServerCallback(
    "s4-phone:server:GetVehicleSearchResults",
    function(source, t, b9)
        local src = source
        local b9 = escape_sqli(b9)
        local ba = {}
        local T = GetCharacter(src)
        ExecuteSql(
            false,
            'SELECT * FROM `owned_vehicles` WHERE `plate` LIKE "%' .. b9 .. '%" OR `owner` = "' .. b9 .. '"',
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        ExecuteSql(
                            true,
                            'SELECT * FROM `users` WHERE `identifier` = "' .. result[D].identifier .. '"',
                            function(H)
                                if H[1] ~= nil then
                                    local bh = {["name"] = json.decode(result[D].vehicle).model}
                                    if bh ~= nil then
                                        table.insert(
                                            ba,
                                            {
                                                plate = result[D].plate,
                                                status = true,
                                                owner = T.firstname .. " " .. T.lastname,
                                                identifier = result[D].identifier,
                                                label = bh["name"]
                                            }
                                        )
                                    else
                                        table.insert(
                                            ba,
                                            {
                                                plate = result[D].plate,
                                                status = true,
                                                owner = T.firstname .. " " .. T.lastname,
                                                identifier = result[D].identifier,
                                                label = "Name not found"
                                            }
                                        )
                                    end
                                end
                            end
                        )
                    end
                elseif n[b9] ~= nil then
                    table.insert(
                        ba,
                        {
                            plate = n[b9].plate,
                            status = n[b9].status,
                            owner = n[b9].owner,
                            identifier = n[b9].identifier,
                            label = "Brand unknown.."
                        }
                    )
                else
                    local bi = GenerateOwnerName()
                    n[b9] = {plate = b9, status = true, owner = bi.name, identifier = bi.identifier}
                    table.insert(
                        ba,
                        {
                            plate = b9,
                            status = true,
                            owner = bi.name,
                            identifier = bi.identifier,
                            label = "Brand unknown .."
                        }
                    )
                end
                t(ba)
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:ScanPlate",
    function(source, t, bj)
        local src = source
        local bk = {}
        local T = GetCharacter(src)
        if bj ~= nil then
            ExecuteSql(
                false,
                'SELECT * FROM `owned_vehicles` WHERE `plate` = "' .. bj .. '"',
                function(result)
                    if result[1] ~= nil then
                        ExecuteSql(
                            true,
                            'SELECT * FROM `users` WHERE `identifier` = "' .. result[1].identifier .. '"',
                            function(H)
                                bk = {
                                    plate = bj,
                                    status = true,
                                    owner = T.firstname .. " " .. T.lastname,
                                    identifier = result[1].identifier
                                }
                            end
                        )
                    elseif n ~= nil and n[bj] ~= nil then
                        bk = n[bj]
                    else
                        local bi = GenerateOwnerName()
                        n[bj] = {plate = bj, status = true, owner = bi.name, identifier = bi.identifier}
                        bk = {plate = bj, status = true, owner = bi.name, identifier = bi.identifier}
                    end
                    t(bk)
                end
            )
        else
            TriggerClientEvent("notification", src, Lang("NO_VEHICLE"), 2)
            t(nil)
        end
    end
)
function GenerateOwnerName()
    local bl = {
        [1] = {name = "Jan Bloksteen", identifier = "DSH091G93"},
        [2] = {name = "Jay Dendam", identifier = "AVH09M193"},
        [3] = {name = "Ben Klaariskees", identifier = "DVH091T93"},
        [4] = {name = "Karel Bakker", identifier = "GZP091G93"},
        [5] = {name = "Klaas Adriaan", identifier = "DRH09Z193"},
        [6] = {name = "Nico Wolters", identifier = "KGV091J93"},
        [7] = {name = "Mark Hendrickx", identifier = "ODF09S193"},
        [8] = {name = "Bert Johannes", identifier = "KSD0919H3"},
        [9] = {name = "Karel de Grote", identifier = "NDX091D93"},
        [10] = {name = "Jan Pieter", identifier = "ZAL0919X3"},
        [11] = {name = "Huig Roelink", identifier = "ZAK09D193"},
        [12] = {name = "Corneel Boerselman", identifier = "POL09F193"},
        [13] = {name = "Hermen Klein Overmeen", identifier = "TEW0J9193"},
        [14] = {name = "Bart Rielink", identifier = "YOO09H193"},
        [15] = {name = "Antoon Henselijn", identifier = "QBC091H93"},
        [16] = {name = "Aad Keizer", identifier = "YDN091H93"},
        [17] = {name = "Thijn Kiel", identifier = "PJD09D193"},
        [18] = {name = "Henkie Krikhaar", identifier = "RND091D93"},
        [19] = {name = "Teun Blaauwkamp", identifier = "QWE091A93"},
        [20] = {name = "Dries Stielstra", identifier = "KJH0919M3"},
        [21] = {name = "Karlijn Hensbergen", identifier = "ZXC09D193"},
        [22] = {name = "Aafke van Daalen", identifier = "XYZ0919C3"},
        [23] = {name = "Door Leeferds", identifier = "ZYX0919F3"},
        [24] = {name = "Nelleke Broedersen", identifier = "IOP091O93"},
        [25] = {name = "Renske de Raaf", identifier = "PIO091R93"},
        [26] = {name = "Krisje Moltman", identifier = "LEK091X93"},
        [27] = {name = "Mirre Steevens", identifier = "ALG091Y93"},
        [28] = {name = "Joosje Kalvenhaar", identifier = "YUR09E193"},
        [29] = {name = "Mirte Ellenbroek", identifier = "SOM091W93"},
        [30] = {name = "Marlieke Meilink", identifier = "KAS09193"}
    }
    return bl[math.random(1, #bl)]
end
ESX.RegisterUsableItem(
    "phone",
    function()
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetGarageVehicles",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local bm = {}
        ExecuteSql(
            false,
            "SELECT * FROM `owned_vehicles` WHERE `owner` = '" .. Player.identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        if E.garage == "OUT" then
                            VehicleState = "OUT"
                        else
                            VehicleState = "Garage"
                        end
                        local bn = {}
                        bn = {
                            model = json.decode(result[D].vehicle).model,
                            plate = E.plate,
                            garage = E.garage,
                            state = VehicleState,
                            fuel = E.fuel or 1000,
                            engine = E.engine or 1000,
                            body = E.body or 1000
                        }
                        table.insert(bm, bn)
                    end
                    t(bm)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetGaleri",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local bo = {}
        ExecuteSql(
            false,
            "SELECT * FROM `s4_gallery` WHERE `identifier` = '" .. Player.identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bp = {}
                        bp = {resim = E.resim, id = E.id}
                        table.insert(bo, bp)
                    end
                    t(bo)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:InstagramHesaplari",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local bq = {}
        ExecuteSql(
            false,
            "SELECT firstname, lastname, identifier FROM `users`",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local br = {}
                        br = {username = E.firstname .. "_" .. E.lastname, identifier = E.identifier}
                        local bs =
                            exports.ghmattimysql:executeSync(
                            "SELECT * FROM `s4_instagram_takip` WHERE `takip_eden` = '" ..
                                Player.identifier .. "' AND `takip_edilen` = '" .. E.identifier .. "'  ",
                            {}
                        )
                        if bs and bs[1] then
                            br.takip = 1
                        end
                        table.insert(bq, br)
                    end
                    t(bq)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetirInstaZamanTuneli",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local bo = {}
        ExecuteSql(
            false,
            "SELECT * FROM `s4_instagram_postlar` ORDER BY id DESC LIMIT 10 ",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bp = {}
                        bp = {resim = E.foto, id = E.id, efekt = E.efekt, yazi = E.yazi, owner = E.owner}
                        local bs =
                            exports.ghmattimysql:executeSync(
                            "SELECT * FROM users WHERE identifier='" .. E.owner .. "' ",
                            {}
                        )
                        if bs and bs[1] then
                            bp.username = bs[1].firstname .. "_" .. bs[1].lastname
                            bp.profilepicture = bs[1].profilepicture
                        end
                        table.insert(bo, bp)
                    end
                    t(bo)
                else
                    t(nil)
                end
            end
        )
    end
)
function getTakipEdiyorMu(bt, ae, t)
    ExecuteSql(
        false,
        "SELECT * FROM `s4_instagram_takip` WHERE `takip_eden` = '" .. bt .. "' AND `takip_edilen` = '" .. ae .. "'  ",
        function(result)
            if result[1] ~= nil then
                t("takip")
            else
                t(nil)
            end
        end
    )
end
ESX.RegisterServerCallback(
    "s4-phone:server:GetGalerinsta",
    function(source, t, as)
        local Player = ESX.GetPlayerFromId(source)
        local identifier
        if as then
            identifier = as
        else
            identifier = Player.identifier
        end
        local bo = {}
        ExecuteSql(
            false,
            "SELECT * FROM `s4_instagram_postlar` WHERE `owner` = '" .. identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bp = {}
                        bp = {resim = E.foto, id = E.id, owner = E.owner, efekt = E.efekt, yazi = E.yazi}
                        table.insert(bo, bp)
                    end
                    t(bo)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetirinstaProfilBilgi",
    function(source, t, as)
        local Player = ESX.GetPlayerFromId(source)
        local identifier
        if as then
            identifier = as
        else
            identifier = Player.identifier
        end
        local bu = {}
        ExecuteSql(
            false,
            "SELECT * FROM `users` WHERE `identifier` = '" .. identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    bu.username = result[1].firstname .. "_" .. result[1].lastname
                    bu.biyografi = result[1].biyografi
                    bu.profilepicture = result[1].profilepicture
                    t(bu)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetNotlar",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local bv = {}
        ExecuteSql(
            false,
            "SELECT * FROM `s4_not` WHERE `identifier` = '" .. Player.identifier .. "'",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bp = {}
                        bp = {baslik = E.baslik, aciklama = E.aciklama, id = E.id}
                        table.insert(bv, bp)
                    end
                    t(bv)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:LoadAdverts",
    function(source, t)
        local Player = ESX.GetPlayerFromId(source)
        local m = {}
        ExecuteSql(
            false,
            "SELECT * FROM `s4_yellowpages`  ORDER BY `id` DESC LIMIT 30",
            function(result)
                if result[1] ~= nil then
                    for D, E in pairs(result) do
                        local bp = {}
                        bp = {mesaj = E.mesaj, isim = E.isim, telno = E.telno}
                        if E.resim then
                            bp.resim = E.resim
                        end
                        table.insert(m, bp)
                    end
                    t(m)
                else
                    t(nil)
                end
            end
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCharacterData",
    function(source, t, v)
        local src = source or v
        local c = ESX.GetPlayerFromId(source)
        t(GetCharacter(src))
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:HasPhone",
    function(source, t)
        local c = ESX.GetPlayerFromId(source)
        if c ~= nil then
            local bw = c.getQuantity("phone")
            if bw >= 1 then
                t(true)
            else
                t(false)
            end
        end
    end
)
RegisterServerEvent("s4-phone:server:GiveContactDetails")
AddEventHandler(
    "s4-phone:server:GiveContactDetails",
    function(bx)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        local T = GetCharacter(src)
        local by = {
            name = {[1] = T.firstname, [2] = T.lastname},
            number = T.phone,
            bank = Player.getAccount("bank").money
        }
        TriggerClientEvent("s4-phone:client:AddNewSuggestion", bx, by)
    end
)
RegisterServerEvent("s4-phone:server:AddTransaction")
AddEventHandler(
    "s4-phone:server:AddTransaction",
    function(a_)
        local src = source
        local Player = ESX.GetPlayerFromId(src)
        ExecuteSql(
            false,
            "INSERT INTO `crypto_transactions` (`identifier`, `title`, `message`) VALUES ('" ..
                Player.identifier ..
                    "', '" .. escape_sqli(a_.TransactionTitle) .. "', '" .. escape_sqli(a_.TransactionMessage) .. "')"
        )
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCurrentpolices",
    function(source, t)
        local bz = {}
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            local T = GetCharacter(E)
            if Player ~= nil then
                if Player.job.name == Config.Meslekler.polis then
                    table.insert(bz, {firstname = T.firstname, lastname = T.lastname, phone = T.phone})
                end
            end
        end
        t(bz)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetS4Share",
    function(source, t)
        local bq = {}
        for D, E in pairs(ESX.GetPlayers()) do
            local result =
                exports.ghmattimysql:executeSync(
                "SELECT bt,firstname,lastname FROM users WHERE identifier = @idf",
                {["@idf"] = GetPlayerIdentifiers(E)[1]}
            )
            if result[1].bt == 1 then
                local a_ = {}
                a_ = {
                    user = result[1].firstname .. " " .. result[1].lastname,
                    identifier = GetPlayerIdentifiers(E)[1],
                    id = E
                }
                table.insert(bq, a_)
            end
        end
        t(bq)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCurrentMecano",
    function(source, t)
        local bz = {}
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            local T = GetCharacter(E)
            if Player ~= nil then
                if Player.job.name == Config.Meslekler.mekanik then
                    table.insert(bz, {firstname = T.firstname, lastname = T.lastname, phone = T.phone})
                end
            end
        end
        t(bz)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCurrentDoctor",
    function(source, t)
        local bz = {}
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            local T = GetCharacter(E)
            if Player ~= nil then
                if Player.job.name == Config.Meslekler.doktor then
                    table.insert(bz, {firstname = T.firstname, lastname = T.lastname, phone = T.phone})
                end
            end
        end
        t(bz)
    end
)
ESX.RegisterServerCallback(
    "s4-phone:server:GetCurrentLawyers",
    function(source, t)
        local bz = {}
        for D, E in pairs(ESX.GetPlayers()) do
            local Player = ESX.GetPlayerFromId(E)
            local T = GetCharacter(E)
            if Player ~= nil then
                if Player.job.name == Config.Meslekler.avukat then
                    table.insert(bz, {firstname = T.firstname, lastname = T.lastname, phone = T.phone})
                end
            end
        end
        t(bz)
    end
)
function GetCharacter(source)
    local c = ESX.GetPlayerFromId(source)
    local result =
        exports.ghmattimysql:executeSync(
        "SELECT * FROM users WHERE identifier = @identifier",
        {["@identifier"] = c.identifier}
    )
    return result[1]
end
function GetPlayerFromPhone(bA)
    local result = exports.ghmattimysql:executeSync("SELECT * FROM users WHERE phone = @phone", {["@phone"] = bA})
    if result[1] and result[1].identifier then
        return ESX.GetPlayerFromIdentifier(result[1].identifier)
    end
    return nil
end
function getPlayerFromIBAN(f)
    local result = exports.ghmattimysql:executeSync("SELECT * FROM users WHERE iban = @iban", {["@iban"] = f})
    if result[1] and result[1].identifier then
        return ESX.GetPlayerFromIdentifier(result[1].identifier)
    end
    return nil
end
function ExecuteSql(bB, bC, t)
    local bD = {}
    local bE = true
    exports.ghmattimysql:execute(
        bC,
        {},
        function(a_)
            if t ~= nil and bB == false then
                t(a_)
            end
            bD = a_
            bE = false
        end
    )
    if bB then
        while bE do
            Citizen.Wait(5)
        end
        if t ~= nil and bB == true then
            t(bD)
        end
    end
    return bD
end
function Lang(at)
    local bF = Config.Languages[Config.Language]
    if bF and bF[at] then
        return bF[at]
    end
    return at
end
