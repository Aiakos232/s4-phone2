const canvas = document.getElementById("videocall-canvas");
var refer = Math.floor(9e7 * Math.random()) * Math.floor(9e7 * Math.random());
S4 = {}, S4.Phone = {}, S4.Screen = {}, S4.Phone.Functions = {}, S4.Phone.Animations = {}, S4.Phone.Notifications = {}, S4.Phone.LangData = {}, S4.Phone.ContactColors = {
    0: "#9b59b6",
    1: "#3498db",
    2: "#e67e22",
    3: "#e74c3c",
    4: "#1abc9c",
    5: "#9c88ff"
}, $(".edevlet-app").hide(), $(".spotify-app").hide(), $(".solitary-app").hide(), $(".havadurumu-app").hide(), $(".safari-app").hide(), $(".kamera-app").hide(), $(".youtube-app").hide(), $(".notlar-app").hide(), $(".hesapmakinesi-app").hide(), havaguncelle(), setInterval(function() {
    havaguncelle()
}, 6e4), S4.Phone.Data = {
    currentApplication: null,
    PlayerData: {},
    Applications: {},
    IsOpen: !1,
    CallActive: !1,
    MetaData: {},
    PlayerJob: {},
    AnonymousCall: !1,
    Darkmode: !1,
    Sound: !0,
    widget_gorunum: !1,
    s4meta: {}
};
var donmus = !1;
OpenedChatData = {
    number: null
};
var CanOpenApp = !0;

function IsAppJobBlocked(t, e) {
    var a = !1;
    return t.length > 0 && $.each(t, function(t, n) {
        n == e && (a = !0)
    }), a
}

function uygulama_kapat() {
    ekran(0), null === S4.Phone.Data.currentApplication ? S4.Phone.Functions.Close() : (S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), CanOpenApp = !1, setTimeout(function() {
        S4.Phone.Functions.ToggleApp(S4.Phone.Data.currentApplication, "none"), CanOpenApp = !0
    }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), "whatsapp" == S4.Phone.Data.currentApplication ? null !== OpenedChatData.number && setTimeout(function() {
        $(".whatsapp-chats").css({
            display: "block"
        }), $(".whatsapp-chats").animate({
            left: "0vh"
        }, 1), $(".whatsapp-openedchat").animate({
            left: "-30vh"
        }, 1, function() {
            $(".whatsapp-openedchat").css({
                display: "none"
            })
        }), OpenedChatPicture = null, OpenedChatData.number = null
    }, 450) : "bank" == S4.Phone.Data.currentApplication ? "invoices" == CurrentTab && setTimeout(function() {
        $(".bank-app-invoices").animate({
            left: "30vh"
        }), $(".bank-app-invoices").css({
            display: "none"
        }), $(".bank-app-accounts").css({
            display: "block"
        }), $(".bank-app-accounts").css({
            left: "0vh"
        });
        var t = $(".bank-app-header").find('[data-headertype="invoices"]'),
            e = $(".bank-app-header").find('[data-headertype="accounts"]');
        $(t).removeClass("bank-app-header-button-selected"), $(e).addClass("bank-app-header-button-selected"), CurrentTab = "accounts"
    }, 400) : "meos" == S4.Phone.Data.currentApplication && ($(".meos-alert-new").remove(), setTimeout(function() {
        $(".meos-recent-alert").removeClass("noodknop"), $(".meos-recent-alert").css({
            "background-color": "#004682"
        })
    }, 400)), S4.Phone.Data.currentApplication = null)
}

function uygulama(t) {
    var e = $("." + t + "-app");
    ust_menu_ac("up"), 0 !== e.length ? (S4.Phone.Functions.ToggleApp(S4.Phone.Data.currentApplication, "none"), S4.Phone.Data.currentApplication = null, S4.Phone.Animations.TopSlideDown(".phone-application-container", 300, 0), S4.Phone.Functions.ToggleApp(t, "block"), S4.Phone.Functions.IsAppHeaderAllowed(t) && "twitter" == !t && S4.Phone.Functions.HeaderTextColor("black", 300), S4.Phone.Data.currentApplication = t, "settings" == t ? $("#myPhoneNumber").text(S4.Phone.Data.PlayerData.charinfo.phone) : "twitter" == t ? ($.post("http://s4-phone/GetMentionedTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadMentionedTweets(t)
    }), $.post("http://s4-phone/GetHashtags", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadHashtags(t)
    }), $.post("http://s4-phone/GetSelfTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadSelfTweets(t)
    }), S4.Phone.Data.IsOpen && $.post("http://s4-phone/GetTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadTweets(t)
    }), $("#tweet-new-url").val(""), S4.Phone.Functions.HeaderTextColor("white", 300)) : "bank" == t ? ($.post("http://s4-phone/GetBankData", JSON.stringify({}), function(t) {
        S4.Phone.Functions.DoBankOpen(t)
    }), $.post("http://s4-phone/GetBankContacts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadContactsWithNumber(t)
    }), $.post("http://s4-phone/GetInvoices", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadBankInvoices(t)
    })) : "whatsapp" == t ? $.post("http://s4-phone/GetWhatsappChats", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadWhatsappChats(t)
    }) : "phone" == t ? ($.post("http://s4-phone/GetMissedCalls", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupRecentCalls(t)
    }), $.post("http://s4-phone/GetSuggestedContacts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupSuggestedContacts(t)
    }), $.post("http://s4-phone/ClearGeneralAlerts", JSON.stringify({
        app: "phone"
    }))) : "mail" == t ? ($.post("http://s4-phone/GetMails", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupMails(t)
    }), $.post("http://s4-phone/ClearGeneralAlerts", JSON.stringify({
        app: "mail"
    }))) : "advert" == t ? $.post("http://s4-phone/LoadAdverts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.RefreshAdverts(t)
    }) : "garage" == t ? $.post("http://s4-phone/SetupGarageVehicles", JSON.stringify({}), function(t) {
        SetupGarageVehicles(t)
    }) : "crypto" == t ? ($.post("http://s4-phone/GetCryptoData", JSON.stringify({
        crypto: "qbit"
    }), function(t) {
        SetupCryptoData(t)
    }), $.post("http://s4-phone/GetCryptoTransactions", JSON.stringify({}), function(t) {
        RefreshCryptoTransactions(t)
    })) : "racing" == t ? $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
        SetupRaces(t)
    }) : "houses" == t ? $.post("http://s4-phone/GetPlayerHouses", JSON.stringify({}), function(t) {
        SetupPlayerHouses(t)
    }) : "meos" == t ? SetupMeosHome() : "lawyers" == t ? $.post("http://s4-phone/GetCurrentLawyers", JSON.stringify({}), function(t) {
        SetupLawyers(t)
    }) : "doctor" == t ? $.post("http://s4-phone/GetCurrentDoctor", JSON.stringify({}), function(t) {
        SetupDoctor(t)
    }) : "taxi" == t ? $.post("http://s4-phone/GetCurrentDrivers", JSON.stringify({}), function(t) {
        SetupDrivers(t)
    }) : "arrests" == t ? $.post("http://s4-phone/GetCurrentArrests", JSON.stringify({}), function(t) {
        SetupArrests(t)
    }) : "darkweb" == t ? $.post("http://s4-phone/DarkwebList", JSON.stringify({}), function(t) {
        SetupDarkweb(t)
    }) : "mecano" == t ? $.post("http://s4-phone/GetCurrentMecano", JSON.stringify({}), function(t) {
        SetupMecano(t)
    }) : "weazel" == t ? $.post("http://s4-phone/GetCurrentWeazel", JSON.stringify({}), function(t) {
        SetupWeazel(t)
    }) : "food" == t ? $.post("http://s4-phone/GetCurrentFoodCompany", JSON.stringify({}), function(t) {
        SetupFood(t)
    }) : "polices" == t && $.post("http://s4-phone/GetCurrentpolices", JSON.stringify({}), function(t) {
        Setuppolices(t)
    })) : S4.Phone.Notifications.Add("fas fa-exclamation-circle", S4.Phone.Functions.Lang("NUI_SYSTEM"), S4.Phone.Data.Applications[t].tooltipText + " " + S4.Phone.Functions.Lang("NUI_NOT_AVAILABLE"))
}

function bos_wp() {
    setTimeout(function() {
        S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), $(".whatsapp-app").css({
            display: "none"
        }), S4.Phone.Functions.HeaderTextColor("white", 300), null !== OpenedChatData.number && setTimeout(function() {
            $(".whatsapp-chats").css({
                display: "block"
            }), $(".whatsapp-chats").animate({
                left: "0vh"
            }, 1), $(".whatsapp-openedchat").animate({
                left: "-30vh"
            }, 1, function() {
                $(".whatsapp-openedchat").css({
                    display: "none"
                })
            }), OpenedChatData.number = null
        }, 450), OpenedChatPicture = null, S4.Phone.Data.currentApplication = null
    }, 500)
}
S4.Phone.Functions.SetupApplications = function(t) {
    S4.Phone.Data.Applications = t.applications, $.each(t.applications, function(e, a) {
        var n = $(".phone-applications").find('[data-appslot="' + a.slot + '"]'),
            o = IsAppJobBlocked(a.blockedjobs, S4.Phone.Data.PlayerJob.name);
        if ($(n).html(""), $(n).css({
                "background-color": "transparent"
            }), $(n).prop("title", ""), $(n).removeData("app"), void 0 !== a.tooltipPos && $(n).removeData("placement"), "darkweb" != a.app) {
            if (!(a.job && a.job !== S4.Phone.Data.PlayerJob.name || o)) {
                $(n).css("background", "url(" + a.color + ")"), $(n).css("background-size", "cover");
                var i = '<i style="display:none;" class="ApplicationIcon ' + a.icon + '" style="' + a.style + '"></i>';
                "meos" == a.app && (i = '<img src="./img/politie.png" class="police-icon">'), $(n).html(i), $(n).prop("title", a.tooltipText), $(n).data("app", a.app), void 0 !== a.tooltipPos && $(n).data("placement", a.tooltipPos)
            }
        } else if (t.vpn) {
            $(n).css({
                "background-color": a.color
            });
            i = '<i class="ApplicationIcon ' + a.icon + '" style="' + a.style + '"></i>';
            $(n).html(i), $(n).prop("title", a.tooltipText), $(n).data("app", a.app), void 0 !== a.tooltipPos && $(n).data("placement", a.tooltipPos)
        }
    }), $('[data-toggle="tooltip"]').tooltip();
    var e = (new Date).getDate();
    $("#takvim").css({
        background: "url('img/apps/system_calendar_" + e + ".png') 0% 0% / cover"
    }), $(".calendar__number").each(function() {
        $(this).html() == e && $(this).addClass("calendar__number--current")
    }), 1 == S4.Phone.Data.widget_gorunum || ($(".havadurumu-widget").css("display", "none"), $(".takvim-widget").css("display", "none"), $(".phone-home-applications").css("top", "8vh"))
}, S4.Phone.Functions.SetupAppWarnings = function(t) {
    $.each(t, function(t, e) {
        var a = $(".phone-applications").find("[data-appslot='" + e.slot + "']").find(".app-unread-alerts");
        e.Alerts > 0 ? ($(a).html(e.Alerts), $(a).css({
            display: "block"
        })) : $(a).css({
            display: "none"
        })
    })
}, S4.Phone.Functions.IsAppHeaderAllowed = function(t) {
    var e = !0;
    return $.each(Config.HeaderDisabledApps, function(a, n) {
        t == n && (e = !1)
    }), e
}, $(document).on("click", ".phone-application", function(t) {
    t.preventDefault();
    var e = $(this).data("app");
    0 !== $("." + e + "-app").length ? CanOpenApp && null == S4.Phone.Data.currentApplication && (S4.Phone.Animations.TopSlideDown(".phone-application-container", 300, 0), S4.Phone.Functions.ToggleApp(e, "block"), S4.Phone.Functions.IsAppHeaderAllowed(e) && "twitter" == !e && S4.Phone.Functions.HeaderTextColor("black", 300), S4.Phone.Data.currentApplication = e, "settings" == e ? $("#myPhoneNumber").text(S4.Phone.Data.PlayerData.charinfo.phone) : "twitter" == e ? ($.post("http://s4-phone/GetMentionedTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadMentionedTweets(t)
    }), $.post("http://s4-phone/GetHashtags", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadHashtags(t)
    }), $.post("http://s4-phone/GetSelfTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadSelfTweets(t)
    }), S4.Phone.Data.IsOpen && $.post("http://s4-phone/GetTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadTweets(t)
    }), $("#tweet-new-url").val(""), S4.Phone.Functions.HeaderTextColor("white", 300)) : "kamera" == e || ("bank" == e ? ($.post("http://s4-phone/GetBankData", JSON.stringify({}), function(t) {
        S4.Phone.Functions.DoBankOpen(t)
    }), $.post("http://s4-phone/GetBankContacts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadContactsWithNumber(t)
    }), $.post("http://s4-phone/GetInvoices", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadBankInvoices(t)
    })) : "whatsapp" == e ? (S4.Phone.Data.PlayerData.identifier, S4.Phone.Data.s4meta.id, $.post("http://s4-phone/GetWhatsappChats", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadWhatsappChats(t)
    })) : "phone" == e ? ($.post("http://s4-phone/GetMissedCalls", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupRecentCalls(t)
    }), $.post("http://s4-phone/GetSuggestedContacts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupSuggestedContacts(t)
    }), $.post("http://s4-phone/ClearGeneralAlerts", JSON.stringify({
        app: "phone"
    }))) : "mail" == e ? ($.post("http://s4-phone/GetMails", JSON.stringify({}), function(t) {
        S4.Phone.Functions.SetupMails(t)
    }), $.post("http://s4-phone/ClearGeneralAlerts", JSON.stringify({
        app: "mail"
    }))) : "advert" == e ? $.post("http://s4-phone/LoadAdverts", JSON.stringify({}), function(t) {
        S4.Phone.Functions.RefreshAdverts(t)
    }) : "galeri" == e ? $.post("http://s4-phone/GetirGaleriResimleri", JSON.stringify({}), function(t) {
        ResimleriGetir(t)
    }) : "instagram" == e ? ($.post("http://s4-phone/GetirGaleriResimleri", JSON.stringify({}), function(t) {
        Galerinsta(t)
    }), $.post("http://s4-phone/GetirInstaZamanTuneli", JSON.stringify({}), function(t) {
        Getirinstazamantuneli(t)
    }), $.post("http://s4-phone/InstagramHesaplari", JSON.stringify({}), function(t) {
        ListeleHesaplar(t)
    })) : "garage" == e ? $.post("http://s4-phone/SetupGarageVehicles", JSON.stringify({}), function(t) {
        SetupGarageVehicles(t)
    }) : "notlar" == e ? $.post("http://s4-phone/GetirNotlar", JSON.stringify({}), function(t) {
        SetupNotlar(t)
    }) : "crypto" == e ? ($.post("http://s4-phone/GetCryptoData", JSON.stringify({
        crypto: "qbit"
    }), function(t) {
        SetupCryptoData(t)
    }), $.post("http://s4-phone/GetCryptoTransactions", JSON.stringify({}), function(t) {
        RefreshCryptoTransactions(t)
    })) : "racing" == e ? $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
        SetupRaces(t)
    }) : "houses" == e ? $.post("http://s4-phone/GetPlayerHouses", JSON.stringify({}), function(t) {
        SetupPlayerHouses(t)
    }) : "meos" == e ? SetupMeosHome() : "lawyers" == e ? $.post("http://s4-phone/GetCurrentLawyers", JSON.stringify({}), function(t) {
        SetupLawyers(t)
    }) : "doctor" == e ? $.post("http://s4-phone/GetCurrentDoctor", JSON.stringify({}), function(t) {
        SetupDoctor(t)
    }) : "taxi" == e ? $.post("http://s4-phone/GetCurrentDrivers", JSON.stringify({}), function(t) {
        SetupDrivers(t)
    }) : "arrests" == e ? $.post("http://s4-phone/GetCurrentArrests", JSON.stringify({}), function(t) {
        SetupArrests(t)
    }) : "darkweb" == e ? $.post("http://s4-phone/DarkwebList", JSON.stringify({}), function(t) {
        SetupDarkweb(t)
    }) : "mecano" == e ? $.post("http://s4-phone/GetCurrentMecano", JSON.stringify({}), function(t) {
        SetupMecano(t)
    }) : "weazel" == e ? $.post("http://s4-phone/GetCurrentWeazel", JSON.stringify({}), function(t) {
        SetupWeazel(t)
    }) : "edevlet" == e ? ($.post("http://s4-phone/GetCurrentMecano", JSON.stringify({}), function(t) {
        SetupMecano(t)
    }), $.post("http://s4-phone/GetCurrentpolices", JSON.stringify({}), function(t) {
        Setuppolices(t)
    }), $.post("http://s4-phone/GetCurrentDoctor", JSON.stringify({}), function(t) {
        SetupDoctor(t)
    }), $.post("http://s4-phone/GetCurrentLawyers", JSON.stringify({}), function(t) {
        SetupLawyers(t)
    })) : "blackmarket" == e ? $.post("http://s4-phone/GetBMarket", JSON.stringify({}), function(t) {
        SetupBM(t)
    }) : "food" == e ? $.post("http://s4-phone/GetCurrentFoodCompany", JSON.stringify({}), function(t) {
        SetupFood(t)
    }) : "havadurumu" == e ? $.post("http://s4-phone/GetHavaDurumu", JSON.stringify({}), function(t) {
        S4.Phone.Functions.DoHavaDurumuOpen(t)
    }) : "ems" == e ? $.post("http://s4-phone/GETEMS", JSON.stringify({}), function(t) {
        SetupEMS(t)
    }) : "polices" == e && $.post("http://s4-phone/GetCurrentpolices", JSON.stringify({}), function(t) {
        Setuppolices(t)
    }))) : S4.Phone.Notifications.Add("fas fa-exclamation-circle", S4.Phone.Functions.Lang("NUI_SYSTEM"), S4.Phone.Data.Applications[e].tooltipText + " " + S4.Phone.Functions.Lang("NUI_NOT_AVAILABLE"))
}), $(document).on("click", ".phone-home-container", function(t) {
    t.preventDefault(), ekran(0), null === S4.Phone.Data.currentApplication ? S4.Phone.Functions.Close() : (S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), CanOpenApp = !1, setTimeout(function() {
        S4.Phone.Functions.ToggleApp(S4.Phone.Data.currentApplication, "none"), CanOpenApp = !0
    }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), "whatsapp" == S4.Phone.Data.currentApplication ? null !== OpenedChatData.number && setTimeout(function() {
        $(".whatsapp-chats").css({
            display: "block"
        }), $(".whatsapp-chats").animate({
            left: "0vh"
        }, 1), $(".whatsapp-openedchat").animate({
            left: "-30vh"
        }, 1, function() {
            $(".whatsapp-openedchat").css({
                display: "none"
            })
        }), OpenedChatPicture = null, OpenedChatData.number = null
    }, 450) : "bank" == S4.Phone.Data.currentApplication ? "invoices" == CurrentTab && setTimeout(function() {
        $(".bank-app-invoices").animate({
            left: "30vh"
        }), $(".bank-app-invoices").css({
            display: "none"
        }), $(".bank-app-accounts").css({
            display: "block"
        }), $(".bank-app-accounts").css({
            left: "0vh"
        });
        var t = $(".bank-app-header").find('[data-headertype="invoices"]'),
            e = $(".bank-app-header").find('[data-headertype="accounts"]');
        $(t).removeClass("bank-app-header-button-selected"), $(e).addClass("bank-app-header-button-selected"), CurrentTab = "accounts"
    }, 400) : "meos" == S4.Phone.Data.currentApplication && ($(".meos-alert-new").remove(), setTimeout(function() {
        $(".meos-recent-alert").removeClass("noodknop"), $(".meos-recent-alert").css({
            "background-color": "#004682"
        })
    }, 400)), S4.Phone.Data.currentApplication = null)
}), S4.Phone.Functions.Open = function(t) {
    S4.Phone.Animations.BottomSlideUp(".container", 300, 0), S4.Phone.Notifications.LoadTweets(t.Tweets), S4.Phone.Data.IsOpen = !0, $(".instagram-footer").html(""), $(".instagram-footer").html(`\n\t\n <a class="i i-home" href="javascript:Panelinsta('timeline')" ></a>\n <a class="i i-ara" href="javascript:Panelinsta('ara')" ></a>\n <a class="i i-ekle" href="javascript:Panelinsta('paylas')" ></a>\n <a class="i i-kalp" href="javascript:Panelinsta('aktivite')" ></a>\n <a class="i i-profil" href="javascript:getirResim('${S4.Phone.Data.PlayerData.identifier}')" ></a>\n\t\n\t\n\t`)
}, S4.Phone.Functions.ToggleApp = function(t, e) {
    $("." + t + "-app").css({
        display: e
    })
}, S4.Phone.Functions.Close = function() {
    "whatsapp" == S4.Phone.Data.currentApplication || "meos" == S4.Phone.Data.currentApplication && ($(".meos-alert-new").remove(), $(".meos-recent-alert").removeClass("noodknop"), $(".meos-recent-alert").css({
        "background-color": "#004682"
    })), S4.Phone.Animations.BottomSlideDown(".container", 300, -70), setTimeout(function() {
        $(".kilitli").css("display", "none")
    }, 300), $.post("http://s4-phone/Close"), S4.Phone.Data.IsOpen = !1;
    for (let t = 0; t < photos.length; t++) photos[t].remove();
    clicked = !1
}, S4.Phone.Functions.HeaderTextColor = function(t, e) {
    $(".phone-header").animate({
        color: t
    }, e)
}, S4.Phone.Animations.BottomSlideUp = function(t, e, a) {
    $(t).css({
        display: "block"
    }).animate({
        bottom: a + "%"
    }, e)
}, S4.Phone.Animations.BottomSlideDown = function(t, e, a) {
    $(t).css({
        display: "block"
    }).animate({
        bottom: a + "%"
    }, e, function() {
        $(t).css({
            display: "none"
        })
    })
}, S4.Phone.Animations.TopSlideDown = function(t, e, a) {
    $(t).css({
        display: "block"
    }).animate({
        top: a + "%"
    }, e)
}, S4.Phone.Animations.TopSlideUp = function(t, e, a, n) {
    $(t).css({
        display: "block"
    }).animate({
        top: a + "%"
    }, e, function() {
        $(t).css({
            display: "none"
        })
    })
}, S4.Phone.Notifications.Add = function(t, e, a, n, o) {
    $.post("http://s4-phone/HasPhone", JSON.stringify({}), function(i) {
        i && (null == o && null == o && (o = 1500), null == S4.Phone.Notifications.Timeout || null == S4.Phone.Notifications.Timeout ? (null != n || null != n ? ($(".notification-icon").css({
            color: n
        }), $(".notification-title").css({
            color: n
        })) : "default" != n && null != n && null != n || ($(".notification-icon").css({
            color: "#e74c3c"
        }), $(".notification-title").css({
            color: "#e74c3c"
        })), S4.Phone.Animations.TopSlideDown(".phone-notification-container", 200, 8), "politie" !== t ? $(".notification-icon").html('<i class="' + t + '"></i>') : $(".notification-icon").html('<img src="./img/politie.png" class="police-icon-notify">'), $(".notification-title").html(e), $(".notification-text").html(a), void 0 === S4.Phone.Notifications.Timeout && null === S4.Phone.Notifications.Timeout || clearTimeout(S4.Phone.Notifications.Timeout), S4.Phone.Notifications.Timeout = setTimeout(function() {
            S4.Phone.Animations.TopSlideUp(".phone-notification-container", 200, -8), S4.Phone.Notifications.Timeout = null
        }, o)) : (null != n || null != n ? ($(".notification-icon").css({
            color: n
        }), $(".notification-title").css({
            color: n
        })) : ($(".notification-icon").css({
            color: "#e74c3c"
        }), $(".notification-title").css({
            color: "#e74c3c"
        })), $(".notification-icon").html('<i class="' + t + '"></i>'), $(".notification-title").html(e), $(".notification-text").html(a), void 0 === S4.Phone.Notifications.Timeout && null === S4.Phone.Notifications.Timeout || clearTimeout(S4.Phone.Notifications.Timeout), S4.Phone.Notifications.Timeout = setTimeout(function() {
            S4.Phone.Animations.TopSlideUp(".phone-notification-container", 200, -8), S4.Phone.Notifications.Timeout = null
        }, o)))
    })
}, S4.Phone.Functions.LoadPhoneData = function(t) {
    S4.Phone.Data.PlayerData = t.PlayerData, S4.Phone.Data.PlayerJob = t.PlayerJob, S4.Phone.Data.MetaData = t.PhoneData.MetaData, S4.Phone.Functions.LoadMetaData(t.PhoneData.MetaData), S4.Phone.Functions.LoadContacts(t.PhoneData.Contacts), S4.Phone.Functions.SetupApplications(t), $.post("http://s4-phone/GetLangData", JSON.stringify({}), function(t) {
        S4.Phone.LangData = t.table[t.current]
    })
}, S4.Phone.Functions.Lang = function(t) {
    return S4.Phone.LangData[t] ? S4.Phone.LangData[t] : t
}, S4.Phone.Functions.UpdateTime = function(t) {
    var e = new Date,
        a = e.getHours(),
        n = e.getMinutes(),
        o = n,
        i = a;
    a < 10 && (i = "0" + i), n < 10 && (o = "0" + n);
    var s = i + ":" + o;
    $("#phone-time").html(s)
};
var NotificationTimeout = null;
S4.Screen.Notification = function(t, e, a, n, o) {
    $.post("http://s4-phone/HasPhone", JSON.stringify({}), function(i) {
        i && (null != o && null != o && $(".screen-notifications-container").css({
            "background-color": o
        }), $(".screen-notification-icon").html('<i class="' + a + '"></i>'), $(".screen-notification-title").text(t), $(".screen-notification-content").text(e), $(".screen-notifications-container").css({
            display: "block"
        }).animate({
            right: "5vh"
        }, 200), null != NotificationTimeout && clearTimeout(NotificationTimeout), NotificationTimeout = setTimeout(function() {
            $(".screen-notifications-container").animate({
                right: "-35vh"
            }, 200, function() {
                $(".screen-notifications-container").css({
                    display: "none"
                })
            }), NotificationTimeout = null
        }, n))
    })
}, $(document).ready(function() {
    $("*").on("input", function() {
        $.post("http://s4-phone/disableControls", JSON.stringify({}))
    }), window.addEventListener("message", function(t) {
        switch (t.data.action) {
            case "open":
                S4.Phone.Functions.Open(t.data), S4.Phone.Functions.SetupAppWarnings(t.data.AppData), S4.Phone.Functions.SetupCurrentCall(t.data.CallData), S4.Phone.Data.IsOpen = !0, S4.Phone.Data.PlayerData = t.data.PlayerData, S4.Phone.Data.s4meta = t.data.s4meta, metaSetup(S4.Phone.Data), $("#bmrkt").css("display", "none");
                break;
            case "close":
                S4.Phone.Functions.Close();
                break;
            case "DosyaAl":
                $(".s4SHRGELD").css("display", "block"), $(".s4SHRGELDtext").html(`<strong>${t.data.veri.firstname} ${t.data.veri.lastname}</strong> tarafından bir adet resim gönderildi.`);
                break;
            case "bm":
                1 == t.data.state ? $("#bmrkt").css("display", "unset") : ($("#bmrkt").css("display", "none"), $("#wifikp").css("display", "none"), $("#bmrkt").css("display", "none"));
                break;
            case "darkwebForceClose":
                S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), CanOpenApp = !1, setTimeout(function() {
                    S4.Phone.Functions.ToggleApp(S4.Phone.Data.currentApplication, "none"), CanOpenApp = !0
                }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), S4.Phone.Data.currentApplication = null;
                break;
            case "LoadPhoneData":
                S4.Phone.Functions.LoadPhoneData(t.data);
                break;
            case "UpdateTime":
                S4.Phone.Functions.UpdateTime(t.data);
                break;
            case "updateTest":
                S4.Phone.Notifications.LoadSelfTweets(t.data.selfTweets);
                break;
            case "updateTweets":
                S4.Phone.Notifications.LoadTweets(t.data.tweets), S4.Phone.Notifications.LoadSelfTweets(t.data.selfTweets);
                break;
            case "TamEkranKapat":
                ekran(0);
                break;
            case "TamEkranGecis":
                ekran(1);
                break;
            case "BildirimManager":
                BildirimManager(t.data.bildirim);
                break;
            case "Notification":
                S4.Screen.Notification(t.data.NotifyData.title, t.data.NotifyData.content, t.data.NotifyData.icon, t.data.NotifyData.timeout, t.data.NotifyData.color);
                break;
            case "PhoneNotification":
                S4.Phone.Notifications.Add(t.data.PhoneNotify.icon, t.data.PhoneNotify.title, t.data.PhoneNotify.text, t.data.PhoneNotify.color, t.data.PhoneNotify.timeout);
                break;
            case "RefreshAppAlerts":
                S4.Phone.Functions.SetupAppWarnings(t.data.AppData);
                break;
            case "UpdateMentionedTweets":
                S4.Phone.Notifications.LoadMentionedTweets(t.data.Tweets);
                break;
            case "UpdateBank":
                $(".bank-app-account-balance").html("&euro; " + t.data.NewBalance), $(".bank-app-account-balance").data("balance", t.data.NewBalance);
                break;
            case "UpdateChat":
                "whatsapp" == S4.Phone.Data.currentApplication && (null !== OpenedChatData.number && OpenedChatData.number == t.data.chatNumber ? S4.Phone.Functions.SetupChatMessages(t.data.chatData) : S4.Phone.Functions.LoadWhatsappChats(t.data.Chats));
                break;
            case "UpdateHashtags":
                S4.Phone.Notifications.LoadHashtags(t.data.Hashtags);
                break;
            case "RefreshWhatsappAlerts":
                S4.Phone.Functions.ReloadWhatsappAlerts(t.data.Chats);
                break;
            case "CancelOutgoingCall":
                $.post("http://s4-phone/HasPhone", JSON.stringify({}), function(t) {
                    t && CancelOutgoingCall()
                });
                break;
            case "IncomingCallAlert":
                $.post("http://s4-phone/HasPhone", JSON.stringify({}), function(e) {
                    e && IncomingCallAlert(t.data.CallData, t.data.Canceled, t.data.AnonymousCall)
                });
                break;
            case "SetupHomeCall":
                S4.Phone.Functions.SetupCurrentCall(t.data.CallData);
                break;
            case "AnswerCall":
                S4.Phone.Functions.AnswerCall(t.data.CallData);
                break;
            case "UpdateCallTime":
                var e = t.data.Time,
                    a = new Date(null);
                a.setSeconds(e);
                var n = a.toISOString().substr(11, 8);
                S4.Phone.Data.IsOpen ? $(".call-notifications").animate({
                    right: "-35vh"
                }, 400, function() {
                    $(".call-notifications").css({
                        display: "none"
                    })
                }) : ("52.1px" !== $(".call-notifications").css("right") && ($(".call-notifications").css({
                    display: "block"
                }), $(".call-notifications").animate({
                    right: "5vh"
                })), $(".call-notifications-title").html("Süren arama (" + n + ")"), $(".call-notifications-content").html("Şu kişiyle " + t.data.Name), $(".call-notifications").removeClass("call-notifications-shake")), $(".phone-call-ongoing-time").html(n), $(".phone-currentcall-title").html("In gesprek (" + n + ")");
                break;
            case "CancelOngoingCall":
                $(".call-notifications").animate({
                    right: "-35vh"
                }, function() {
                    $(".call-notifications").css({
                        display: "none"
                    })
                }), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
                    S4.Phone.Functions.ToggleApp("phone-call", "none"), $(".phone-application-container").css({
                        display: "none"
                    })
                }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), S4.Phone.Data.CallActive = !1, S4.Phone.Data.currentApplication = null;
                break;
            case "RefreshContacts":
                S4.Phone.Functions.LoadContacts(t.data.Contacts);
                break;
            case "UpdateMails":
                S4.Phone.Functions.SetupMails(t.data.Mails);
                break;
            case "RefreshAdverts":
                "advert" == S4.Phone.Data.currentApplication && S4.Phone.Functions.RefreshAdverts(t.data.Adverts);
                break;
            case "AddPoliceAlert":
                AddPoliceAlert(t.data);
                break;
            case "UpdateApplications":
                S4.Phone.Data.PlayerJob = t.data.JobData, S4.Phone.Functions.SetupApplications(t.data);
                break;
            case "UpdateTransactions":
                RefreshCryptoTransactions(t.data);
                break;
            case "UpdateRacingApp":
                $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
                    SetupRaces(t)
                })
        }
    })
}), $(document).on("keydown", function() {
    switch (event.keyCode) {
        case 27:
        case 112:
            S4.Phone.Functions.Close(), ekran(0)
    }
});
var acik = !1;

function fotograf_cek() {
    $.post("http://s4-phone/PostNewImage", JSON.stringify({}), function(t) {
        $(".cekilen_foto").css({
            display: "block"
        }), $(".foto").css({
            background: "url(" + t + ")",
            "background-size": "cover",
            "background-position": "center"
        }), $("#foto_url").val(t)
    }), S4.Phone.Functions.Close()
}

function kaydet() {
    var t = $("#foto_url").val();
    $.post("http://s4-phone/FotoGaleriKayit", JSON.stringify({
        resim_url: t
    })), $(".cekilen_foto").css({
        display: "none"
    }), S4.Phone.Notifications.Add("fas fa-check-circle", "Galeri", " Fotoğraf kaydedildi.")
}

function iptal() {
    $(".cekilen_foto").css({
        display: "none"
    })
}

function ekran(t) {
    0 == t && (donmus = !1, $(".d_1").css({
        display: "unset"
    }), $(".d_2").css({
        display: "none"
    }), $(".container").css({
        bottom: "0%",
        left: "",
        transform: "",
        zoom: ""
    })), 1 == t && ($(".d_1").css({
        display: "none"
    }), $(".d_2").css({
        display: "unset"
    }), donmus = !0)
}

function fener(t) {
    0 == t && ($(".ff_1").css({
        display: "unset"
    }), $(".ff_2").css({
        display: "none"
    }), $.post("http://s4-phone/Fener", JSON.stringify({
        fener: "kapali"
    }))), 1 == t && ($(".ff_1").css({
        display: "none"
    }), $(".ff_2").css({
        display: "unset"
    }), $.post("http://s4-phone/Fener", JSON.stringify({
        fener: "acik"
    })))
}

function ustbar() {
    console.log("ustbar")
}

function BildirimManager(t) {
    "acik" == t.durum ? $("#" + t.tip + "_b").css("display", "block") : $("#" + t.tip + "_b").css("display", "none"), $("#" + t.tip + "_uyg_metni").val(t.title), console.log(t)
}

function havaguncelle() {
    $.post("http://s4-phone/GetHavaDurumu", JSON.stringify({}), function(t) {
        S4.Phone.Functions.DoHavaDurumuOpen(t)
    })
}

function kapat_status() {
    $(".notifbar").height(0), document.getElementsByClassName("notifbar")[0].style.top = "-200px", setTimeout(function() {
        $(".notifbar").css("display", "none")
    }, 1e3)
}

function ac_status() {
    $(".notifbar").css("display", "block"), setTimeout(function() {
        $(".notifbar").height(520), document.getElementsByClassName("notifbar")[0].style.top = "0px"
    }, 100)
}

function guncelleParlak(t) {
    var e = 1 + t / 300;
    $(".container").css("filter", "brightness(" + e + ")")
}

function myFunction() {
    var t, e, a, n;
    for (t = document.getElementById("myInput").value.toUpperCase(), e = document.getElementById("myTable").getElementsByTagName("tr"), n = 0; n < e.length; n++)(a = e[n].getElementsByTagName("td")[0]) && ((a.textContent || a.innerText).toUpperCase().indexOf(t) > -1 ? e[n].style.display = "" : e[n].style.display = "none")
}

function metaSetup(t) {
    "kilitli" == t.s4meta.durum ? t.s4meta.id != t.PlayerData.identifier && $(".kilitli").css("display", "block") : $(".kilitli").css("display", "none"), t.s4meta.id == t.PlayerData.identifier ? $(".mmm").css("display", "unset") : $(".mmm").css("display", "none")
}
$("body").each(function() {
    var t, e;
    $(this).mousedown(function() {
        t = setTimeout(function() {
            e = !0
        }, 1500)
    }).mouseup(function() {
        e && (acik = 0 == acik), e = !1, clearTimeout(t)
    })
}), document.addEventListener("swiped", function(t) {
    console.log(t.target), console.log(t.detail.dir)
}), $(function() {
    $("#sortable").sortable(), $("#sortable").disableSelection(), $("#sortable2").sortable(), $("#sortable2").disableSelection()
}), $("#ustbar").click(function() {
    ac_status()
}), S4.Phone.Settings = {}, S4.Phone.Settings.Background = "background-1", S4.Phone.Settings.OpenedTab = null, S4.Phone.Settings.Backgrounds = {
    "background-1": {
        label: "Standard"
    }
};
var PressedBackground = null,
    PressedBackgroundObject = null,
    OldBackground = null,
    IsChecked = null;
$(document).on("click", ".settings-app-tab", function(t) {
    t.preventDefault();
    var e = $(this).data("settingstab");
    if ("arkaplan" == e) S4.Phone.Animations.TopSlideDown(".settings-" + e + "-tab", 200, 0), S4.Phone.Settings.OpenedTab = e, $(".arkaplan_ayarlari").css("display", "block");
    else if ("profilepicture" == e) S4.Phone.Animations.TopSlideDown(".settings-" + e + "-tab", 200, 0), S4.Phone.Settings.OpenedTab = e;
    else if ("numberrecognition" == e) {
        var a = $(".numberrec-box");
        S4.Phone.Data.AnonymousCall = !a.prop("checked"), a.prop("checked", S4.Phone.Data.AnonymousCall), S4.Phone.Data.AnonymousCall ? $("#numberrecognition > p").html("Open") : $("#numberrecognition > p").html("Closed")
    } else if ("available" == e) {
        a = $(".available-box");
        S4.Phone.Data.AnonymousCall = !a.prop("checked"), a.prop("checked", S4.Phone.Data.AnonymousCall);
        var n = "Uçak modu kapatıldı",
            o = !1;
        "Açık" == $("#available > p").html() ? $("#available > p").html("Kapalı") : ($("#available > p").html("Açık"), n = "Uçak modu açıldı", o = !0), $.post("http://s4-phone/UpdateAvailableStatus", JSON.stringify({
            available: o
        }), function() {
            S4.Phone.Notifications.Add("fas fa-cog", S4.Phone.Functions.Lang("SETTINGS_TITLE"), n)
        })
    } else if ("bluetooth" == e) {
        a = $(".bluetooth-box");
        S4.Phone.Data.Bt = !a.prop("checked"), a.prop("checked", S4.Phone.Data.Bt);
        n = "S4 SHARE kapatıldı", o = !1;
        0 == S4.Phone.Data.Bt ? (n = "S4 SHARE kapatıldı", o = !1) : (n = "S4 SHARE açıldı", o = !0), $.post("http://s4-phone/s4share", JSON.stringify({
            veri: o
        }), function() {
            S4.Phone.Notifications.Add("fas fa-cog", S4.Phone.Functions.Lang("SETTINGS_TITLE"), n)
        })
    } else if ("darkmode" == e) {
        a = $(".darkmode-box");
        S4.Phone.Data.Darkmode = !a.prop("checked"), a.prop("checked", S4.Phone.Data.Darkmode);
        n = "Karanlık mod kapatıldı", o = !1;
        "Açık" == $("#darkmode > p").html() ? $("#darkmode > p").html("Kapalı") : ($("#darkmode > p").html("Açık"), n = "Karanlık mod açıldı", o = !0), S4.Phone.Notifications.Add("fas fa-cog", S4.Phone.Functions.Lang("SETTINGS_TITLE"), n), SettingsDarkmode()
    } else if ("sound" == e) {
        a = $(".sound-box");
        S4.Phone.Data.Sound = !a.prop("checked"), a.prop("checked", S4.Phone.Data.Sound);
        n = "Zil sesleri kapatıldı", o = !1;
        "Açık" == $("#sound > p").html() ? $("#sound > p").html("Kapalı") : ($("#sound > p").html("Açık"), n = "Zil sesleri açıldı", o = !0), $.post("http://s4-phone/UpdateSoundStatus", JSON.stringify({
            sound: o
        }), function() {
            S4.Phone.Notifications.Add("fas fa-cog", S4.Phone.Functions.Lang("SETTINGS_TITLE"), n)
        })
    } else if ("wifi" == e) $(".wifi_ayarlari").css("display", "block");
    else if ("widget" == e) $(".widget_ayarlari").css("display", "block");
    else if ("widget_gorunum" == e) {
        a = $(".widget_gorunum-box");
        S4.Phone.Data.widget_gorunum = !a.prop("checked"), a.prop("checked", S4.Phone.Data.widget_gorunum), 1 == S4.Phone.Data.widget_gorunum ? "w1" == S4.Phone.Data.widget_tip ? ($(".havadurumu-widget").css("display", "block"), $(".takvim-widget").css("display", "none")) : ($(".havadurumu-widget").css("display", "none"), $(".takvim-widget").css("display", "block")) : ($(".havadurumu-widget").css("display", "none"), $(".takvim-widget").css("display", "none"))
    } else if ("widget_konum" == e) {
        a = $(".widget_konum-box");
        S4.Phone.Data.widget_konum = !a.prop("checked"), a.prop("checked", S4.Phone.Data.widget_konum)
    }
}), ListeleBT = function(t) {
    $(".oyuncu_listesi").html(""), null != t && $.each(t, function(t, e) {
        var a = `\n \n\n<tr>\n    <th><input type="text"  value="${e.user}" disabled /></th>\n    \n    <th><a href="javascript:gonderBT('${e.id}')" id="ah_${e.id}" class="takipbtn" >Paylaş</a></th>\n</tr>\n\t\t\t\n\t\t\t`;
        $(".oyuncu_listesi").append(a), e.identifier != S4.Phone.Data.PlayerData.identifier && $(".oyuncu_listesi").append(a)
    })
};
var simdiki_id = null;

function gonderBT(t) {
    $("#ah_" + t).attr("href", "#"), $("#ah_" + t).html('<i class="fas fa-circle-notch fa-spin"></i>'), S4.Phone.Notifications.Add("fab fa-bluetooth-b", "S4 SHARE", "Gönderiliyor..."), $.post("http://s4-phone/DosyaGonder", JSON.stringify({
        src: t,
        resim_url: simdiki_id
    }))
}

function btgelenkayit() {
    $.post("http://s4-phone/DosyaKaydet", JSON.stringify({
        durum: "kaydet"
    })), $(".s4SHRGELD").css("display", "none")
}

function btgeleniptal() {
    $.post("http://s4-phone/DosyaKaydet", JSON.stringify({
        durum: "none"
    })), $(".s4SHRGELD").css("display", "none")
}

function wifiac() {
    $.post("http://s4-phone/WifiSifreKontrol", JSON.stringify({
        sifre: $(".wifin").val()
    }), function(t) {
        t == $(".wifin").val() ? (S4.Phone.Notifications.Add("fas fa-wifi", "Wifi", "Connected."), $("#wifikp").css("display", "block")) : (S4.Phone.Notifications.Add("fas fa-wifi", "Wifi", "Wrong password."), $("#wifikp").css("display", "none"), $("#bmrkt").css("display", "none"))
    })
}

function wifikp() {
    $.post("http://s4-phone/WifiSifreKontrol", JSON.stringify({
        sifre: "asdasdasdsasadas"
    }), function(t) {
        $("#wifikp").css("display", "none"), $("#bmrkt").css("display", "none")
    })
}

function kapatwd() {
    $(".wifi_ayarlari").css("display", "none"), $(".widget_ayarlari").css("display", "none"), $(".arkaplan_ayarlari").css("display", "none")
}
$(document).on("click", ".wget", function(t) {
    t.preventDefault();
    var e = $(this).data("widget");
    S4.Phone.Notifications.Add("fas fa-cog", "Widget", "Seçtiğiniz widget ayarlandı."), 1 == S4.Phone.Data.widget_gorunum && ("w1" == e ? ($(".havadurumu-widget").css("display", "block"), $(".takvim-widget").css("display", "none")) : "w2" == e && ($(".havadurumu-widget").css("display", "none"), $(".takvim-widget").css("display", "block")), S4.Phone.Data.widget_tip = e)
}), SettingsDarkmode = function() {
    S4.Phone.Data.Darkmode ? ($(".settings-app").css({
        background: "#1f1f1f"
    }), $(".settings-tab-description").css({
        color: "rgb(230, 230, 230)"
    }), $(".settings-tab-title").css({
        color: "rgb(230, 230, 230)"
    }), $(".settings-app-tab-header").css({
        color: "rgb(230, 230, 230)"
    }), $(".settings-app-header").css({
        color: "rgb(230, 230, 230)"
    }), $(".settings-tab-icon").css({
        color: "white"
    }), $(".settings-app-tab").css({
        background: "black"
    }), $(".advert-app").css({
        background: "#1f1f1f"
    }), $(".advert-list").css({
        "background-color": "#1f1f1f",
        "box-shadow": "0px 0 1px .5px rgba(255, 255, 255, 0.233)"
    }), $("#advert-header-text").css({
        color: "white"
    }), $("#advert-header-name").css({
        color: "white"
    }), $(".test-slet").css({
        "background-color": "#1f1f1f",
        color: "white"
    }), $(".whatsapp-app").css({
        "background-image": "url('https://cdn.discordapp.com/attachments/692089489186750627/836900693503508480/97c00759d90d786d9b6096d274ad3e07.png')"
    }), $(".whatsapp-openedchat").css({
        "background-image": "url('https://cdn.discordapp.com/attachments/692089489186750627/836900693503508480/97c00759d90d786d9b6096d274ad3e07.png')"
    }), $(".mail-header").css({
        "background-color": "#1f1f1f"
    }), $("#mail-header-text").css({
        color: "white"
    }), $(".mail").css({
        "background-color": "#1f1f1f"
    }), $(".mail-list").css({
        "background-color": "#1f1f1f"
    }), $(".opened-mail").css({
        background: "#1f1f1f"
    }), $(".opened-mail-footer").css({
        "background-color": "#1f1f1f",
        color: "white"
    }), $(".opened-mail-footer-item").css({
        color: "white"
    }), $(".mail-back").css({
        color: "white"
    }), $(".mail-content").css({
        color: "white"
    }), $(".mail-date").css({
        color: "white"
    }), $(".mail-sender").css({
        color: "white"
    }), $(".mail-text").css({
        color: "white"
    }), $(".mail-time").css({
        color: "white"
    }), $(".mail-image-media").css({
        color: "white"
    }), $("#mail-header-text").css({
        color: "white"
    }), $("#mail-header-mail").css({
        color: "white"
    }), $("#mail-header-lastsync").css({
        color: "white"
    }), $(".mail-subject").css({
        color: "white"
    }), $(".nomails").css({
        color: "white"
    }), $(".phone-app").css({
        background: "#1f1f1f"
    }), $(".phone-keypad").css({
        background: "#1f1f1f"
    }), $(".phone-recent").css({
        background: "#1f1f1f"
    }), $(".phone-add-contact").css({
        background: "#1f1f1f"
    }), $(".phone-add-contact-header").css({
        color: "white"
    }), $(".phone-add-contact-button").css({
        color: "white"
    }), $("#phone-search-icon").css({
        color: "white"
    }), $("#phone-plus-icon").css({
        color: "white"
    }), $("#phone-add-contact-name-icon").css({
        color: "white"
    }), $("#phone-add-contact-number-icon").css({
        color: "white"
    }), $("#phone-add-contact-iban-icon").css({
        color: "white"
    }), $(".phone-add-contact-name").css({
        color: "white"
    }), $(".phone-add-contact-number").css({
        color: "white"
    }), $(".phone-add-contact-iban").css({
        color: "white"
    }), $(".phone-edit-contact").css({
        background: "#1f1f1f"
    }), $(".phone-edit-contact-button").css({
        color: "white"
    }), $(".phone-edit-contact-header").css({
        color: "white"
    }), $(".phone-suggestedcontacts").css({
        background: "#1f1f1f"
    }), $(".phone-suggestedcontacts-header").css({
        color: "white"
    }), $(".phone-app-footer-button").css({
        color: "white"
    }), $(".phone-keypad-key").css({
        color: "white"
    }), $(".phone-keypad-header").css({
        color: "white"
    }), $(".phone-recent-header").css({
        color: "white"
    }), $(".phone-app-header").css({
        color: "white"
    }), $("#total-contacts").css({
        color: "white"
    }), $(".phone-contact").css({
        "background-color": "#1f1f1f",
        border: ".1vh solid rgba(206, 206, 206, 0.2)"
    }), $(".phone-contact-action-buttons > i").css({
        color: "white"
    }), $("#phone-edit-contact-name-icon").css({
        color: "white"
    }), $("#phone-edit-contact-number-icon").css({
        color: "white"
    }), $("#phone-edit-contact-iban-icon").css({
        color: "white"
    }), $(".phone-edit-contact-name").css({
        color: "white"
    }), $(".phone-edit-contact-number").css({
        color: "white"
    }), $(".phone-edit-contact-iban").css({
        color: "white"
    }), $(".phone-contact-name").css({
        color: "white"
    }), $("#phone-keypad-input").css({
        color: "white",
        "box-shadow": "inset 0 0 .5vh 0 rgba(255, 255, 255, 0.171"
    }), $(".mecano-app").css({
        background: "#1f1f1f"
    }), $(".polices-app").css({
        background: "#1f1f1f"
    }), $(".doctor-app").css({
        background: "#1f1f1f"
    }), $(".lawyers-app").css({
        background: "#1f1f1f"
    }), $(".arrests-app").css({
        background: "#1f1f1f"
    }), $(".weazel-app").css({
        background: "#1f1f1f"
    }), $(".food-app").css({
        background: "#1f1f1f"
    })) : ($(".settings-app-tab").css({
        background: "white"
    }), $(".settings-app").css({
        background: "#f0eff4"
    }), $(".settings-tab-description").css({
        color: "rgba(0, 0, 0, 0.65)"
    }), $(".settings-tab-title").css({
        color: "#333"
    }), $(".settings-app-header").css({
        color: "#333"
    }), $(".settings-tab-icon").css({
        color: "#333"
    }), $(".advert-app").css({
        background: "#f2f2f2"
    }), $(".advert-list").css({
        "background-color": "rgb(255, 255, 255)",
        "box-shadow": "0px 0 1px .5px rgba(0, 0, 0, 0.233)"
    }), $("#advert-header-text").css({
        color: "black"
    }), $("#advert-header-name").css({
        color: "black"
    }), $(".test-slet").css({
        "background-color": "rgb(234, 234, 234)",
        color: "black"
    }), $(".whatsapp-app").css({
        "background-image": "url('./img/apps/whatsapp-chat.png')"
    }), $(".whatsapp-openedchat").css({
        "background-image": "url('./img/apps/whatsapp-chat.png')"
    }), $(".mail-header").css({
        "background-color": "#f2f2f2"
    }), $("#mail-header-text").css({
        color: "white"
    }), $(".mail").css({
        "background-color": "#f2f2f2"
    }), $(".mail-list").css({
        "background-color": "#f2f2f2"
    }), $(".opened-mail").css({
        background: "#f2f2f2"
    }), $(".opened-mail-footer").css({
        "background-color": "#f2f2f2",
        color: "white"
    }), $(".opened-mail-footer-item").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-back").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-content").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-date").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-sender").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-text").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-time").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-image-media").css({
        color: "rgb(24, 24, 24)"
    }), $("#mail-header-text").css({
        color: "rgb(24, 24, 24)"
    }), $("#mail-header-mail").css({
        color: "rgb(24, 24, 24)"
    }), $("#mail-header-lastsync").css({
        color: "rgb(24, 24, 24)"
    }), $(".mail-subject").css({
        color: "rgb(24, 24, 24)"
    }), $(".nomails").css({
        color: "black"
    }), $(".phone-app").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-keypad").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-recent").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-add-contact").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-add-contact-header").css({
        color: "rgb(44,44,44)"
    }), $(".phone-add-contact-button").css({
        color: "rgb(44,44,44)"
    }), $("#phone-search-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-plus-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-add-contact-name-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-add-contact-number-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-add-contact-iban-icon").css({
        color: "rgb(44,44,44)"
    }), $(".phone-add-contact-name").css({
        color: "rgb(44,44,44)"
    }), $(".phone-add-contact-number").css({
        color: "rgb(44,44,44)"
    }), $(".phone-add-contact-iban").css({
        color: "rgb(44,44,44)"
    }), $(".phone-edit-contact").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-edit-contact-button").css({
        color: "rgb(44,44,44)"
    }), $(".phone-edit-contact-header").css({
        color: "rgb(44,44,44)"
    }), $(".phone-suggestedcontacts").css({
        background: "rgb(230, 230, 230)"
    }), $(".phone-suggestedcontacts-header").css({
        color: "rgb(44,44,44)"
    }), $(".phone-app-footer-button").css({
        color: "rgb(44,44,44)"
    }), $(".phone-keypad-key").css({
        color: "rgb(44,44,44)"
    }), $(".phone-keypad-header").css({
        color: "rgb(44,44,44)"
    }), $(".phone-recent-header").css({
        color: "rgb(44,44,44)"
    }), $(".phone-app-header").css({
        color: "rgb(44,44,44)"
    }), $("#total-contacts").css({
        color: "rgb(44,44,44)"
    }), $(".phone-contact").css({
        "background-color": "rgb(240, 240, 240)",
        border: ".1vh solid rgb(206, 206, 206)"
    }), $(".phone-contact-action-buttons > i").css({
        color: "rgb(44,44,44)"
    }), $("#phone-edit-contact-name-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-edit-contact-number-icon").css({
        color: "rgb(44,44,44)"
    }), $("#phone-edit-contact-iban-icon").css({
        color: "rgb(44,44,44)"
    }), $(".phone-edit-contact-name").css({
        color: "rgb(44,44,44)"
    }), $(".phone-edit-contact-number").css({
        color: "rgb(44,44,44)"
    }), $(".phone-edit-contact-iban").css({
        color: "rgb(44,44,44)"
    }), $(".phone-contact-name").css({
        color: "rgb(44,44,44)"
    }), $("#phone-keypad-input").css({
        color: "rgb(44,44,44)",
        "box-shadow": "inset 0 0 .5vh 0 rgba(0, 0, 0, 0.171)"
    }), $(".mecano-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".polices-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".doctor-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".lawyers-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".arrests-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".weazel-app").css({
        background: "rgb(248, 248, 248)"
    }), $(".food-app").css({
        background: "rgb(248, 248, 248)"
    }))
}, $(document).on("click", "#accept-background", function(t) {
    t.preventDefault(), !1 === S4.Phone.Functions.IsBackgroundCustom() ? (S4.Phone.Notifications.Add("fas fa-paint-brush", S4.Phone.Functions.Lang("SETTINGS_TITLE"), S4.Phone.Settings.Backgrounds[S4.Phone.Settings.Background].label + " is ingesteld!"), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100), $(".phone-background").css({
        "background-image": "url('/html/img/backgrounds/" + S4.Phone.Settings.Background + ".png')"
    })) : (S4.Phone.Notifications.Add("fas fa-paint-brush", S4.Phone.Functions.Lang("SETTINGS_TITLE"), S4.Phone.Functions.Lang("BACKGROUND_SET")), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100), $(".phone-background").css({
        "background-image": "url('" + S4.Phone.Settings.Background + "')"
    }))
}), S4.Phone.Functions.LoadMetaData = function(t) {
    null !== t.background && void 0 !== t.background ? S4.Phone.Settings.Background = t.background : S4.Phone.Settings.Background = "background-1", S4.Phone.Functions.IsBackgroundCustom() ? $(".phone-background").css({
        "background-image": "url('" + S4.Phone.Settings.Background + "')"
    }) : $(".phone-background").css({
        "background-image": "url('/html/img/backgrounds/" + S4.Phone.Settings.Background + ".png')"
    }), "default" == t.profilepicture ? $("[data-settingstab='profilepicture']").find(".settings-tab-icon").html('<img src="./img/default.png">') : $("[data-settingstab='profilepicture']").find(".settings-tab-icon").html('<img src="' + t.profilepicture + '">')
}, $(document).on("click", "#cancel-background", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100)
}), S4.Phone.Functions.IsBackgroundCustom = function() {
    var t = !0;
    return $.each(S4.Phone.Settings.Backgrounds, function(e, a) {
        S4.Phone.Settings.Background == e && (t = !1)
    }), t
}, $(document).on("click", ".background-option", function(t) {
    t.preventDefault(), PressedBackground = $(this).data("background"), PressedBackgroundObject = this, OldBackground = $(this).parent().find(".background-option-current"), 0 === (IsChecked = $(this).find(".background-option-current")).length && ("custom-background" != PressedBackground ? (S4.Phone.Settings.Background = PressedBackground, $(OldBackground).fadeOut(50, function() {
        $(OldBackground).remove()
    }), $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>')) : S4.Phone.Animations.TopSlideDown(".background-custom", 200, 13))
}), $(document).on("click", "#accept-custom-background", function(t) {
    t.preventDefault(), S4.Phone.Settings.Background = $(".custom-background-input").val(), $(OldBackground).fadeOut(50, function() {
        $(OldBackground).remove()
    }), $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>'), S4.Phone.Animations.TopSlideUp(".background-custom", 200, -23)
}), $(document).on("click", "#cancel-custom-background", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".background-custom", 200, -23)
});
var PressedProfilePicture = null,
    PressedProfilePictureObject = null,
    OldProfilePicture = null,
    ProfilePictureIsChecked = null;

function ark_ds(t) {
    var e = "../html/img/backgrounds/" + t + ".png";
    S4.Phone.Settings.Background = e, S4.Phone.Notifications.Add("fas fa-cog", "Ayarlar", "Arkaplan değiştirildi."), $(".phone-background").css({
        "background-image": "url(" + e + ")",
        "background-size": "cover",
        "background-position": "-0.3vh 0.5vh",
        "background-repeat": "no-repeat"
    }), $.post("http://s4-phone/SetBackground", JSON.stringify({
        background: S4.Phone.Settings.Background
    }))
}
$(document).on("click", "#accept-profilepicture", function(t) {
    t.preventDefault();
    var e = S4.Phone.Data.MetaData.profilepicture;
    "default" === e ? (S4.Phone.Notifications.Add("fas fa-paint-brush", S4.Phone.Functions.Lang("SETTINGS_TITLE"), S4.Phone.Functions.Lang("POFILE_DEFAULT")), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100), $("[data-settingstab='profilepicture']").find(".settings-tab-icon").html('<img src="./img/default.png">')) : (S4.Phone.Notifications.Add("fas fa-paint-brush", S4.Phone.Functions.Lang("SETTINGS_TITLE"), S4.Phone.Functions.Lang("PROFILE_SET")), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100), $("[data-settingstab='profilepicture']").find(".settings-tab-icon").html('<img src="' + e + '">')), $.post("http://s4-phone/UpdateProfilePicture", JSON.stringify({
        profilepicture: e
    }))
}), $(document).on("click", "#accept-custom-profilepicture", function(t) {
    t.preventDefault(), S4.Phone.Data.MetaData.profilepicture = $(".custom-profilepicture-input").val(), $(OldProfilePicture).fadeOut(50, function() {
        $(OldProfilePicture).remove()
    }), $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>'), S4.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23)
}), $(document).on("click", ".profilepicture-option", function(t) {
    t.preventDefault(), PressedProfilePicture = $(this).data("profilepicture"), PressedProfilePictureObject = this, OldProfilePicture = $(this).parent().find(".profilepicture-option-current"), 0 === (ProfilePictureIsChecked = $(this).find(".profilepicture-option-current")).length && ("custom-profilepicture" != PressedProfilePicture ? (S4.Phone.Data.MetaData.profilepicture = PressedProfilePicture, $(OldProfilePicture).fadeOut(50, function() {
        $(OldProfilePicture).remove()
    }), $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>')) : S4.Phone.Animations.TopSlideDown(".profilepicture-custom", 200, 13))
}), $(document).on("click", "#cancel-profilepicture", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".settings-" + S4.Phone.Settings.OpenedTab + "-tab", 200, -100)
}), $(document).on("click", "#cancel-custom-profilepicture", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23)
});
var ContactSearchActive = !1,
    CurrentFooterTab = "contacts",
    CallData = {},
    ClearNumberTimer = null,
    SelectedSuggestion = null,
    AmountOfSuggestions = 0;

function kapat(t, e) {}
$(document).on("click", ".phone-app-footer-button", function(t) {
    t.preventDefault();
    var e = $(this).data("phonefootertab");
    if (e !== CurrentFooterTab) {
        $(this).parent().find('[data-phonefootertab="' + CurrentFooterTab + '"');
        $(".phone-" + CurrentFooterTab).hide(), $(".phone-" + e).show(), $("." + CurrentFooterTab + "_1").hide(), $("." + CurrentFooterTab + "_0").show(), $("." + e + "_1").show(), $("." + e + "_0").hide(), "recent" == e ? $.post("http://s4-phone/ClearRecentAlerts") : "suggestedcontacts" == e && $.post("http://s4-phone/ClearRecentAlerts"), kapat(e, CurrentFooterTab), CurrentFooterTab = e
    }
}), $(document).on("click", "#phone-search-icon", function(t) {
    t.preventDefault(), ContactSearchActive ? $("#contact-search").animate({
        opacity: "0.0"
    }, 150, function() {
        $("#contact-search").css({
            display: "none"
        }), $("#phone-plus-icon").animate({
            opacity: "1.0",
            display: "block"
        }, 150)
    }) : $("#phone-plus-icon").animate({
        opacity: "0.0",
        display: "none"
    }, 150, function() {
        $("#contact-search").css({
            display: "block"
        }).animate({
            opacity: "1.0"
        }, 150)
    }), ContactSearchActive = !ContactSearchActive
}), S4.Phone.Functions.SetupRecentCalls = function(t) {
    $(".phone-recent-calls").html(""), t = t.reverse(), $.each(t, function(t, e) {
        var a = e.name.charAt(0),
            n = "fas fa-phone-slash",
            o = "color: #e74c3c;";
        if ("outgoing" === e.type) {
            n = "fas fa-phone-volume";
            o = "color: #2ecc71; font-size: 1.4vh;"
        }
        e.anonymous && (a = "A", e.name = "Gizli Numara");
        var i = '<div class="phone-recent-call" id="recent-' + t + '"><div class="phone-recent-call-image">' + a + '</div> <div class="phone-recent-call-name">' + e.name + '</div> <div class="phone-recent-call-type"><i class="' + n + '" style="' + o + '"></i></div> <div class="phone-recent-call-time">' + e.time + "</div> </div>";
        $(".phone-recent-calls").append(i), $("#recent-" + t).data("recentData", e)
    })
}, $(document).on("click", ".phone-recent-call", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("recentData");
    cData = {
        number: a.number,
        name: a.name
    }, $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: cData,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        cData.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : t.IsAvailable ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), "Ulaşılamıyor!") : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(cData.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".phone-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = cData.name, CallData.number = cData.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
}), $(document).on("click", ".phone-keypad-key-call", function(t) {
    t.preventDefault();
    var e = document.getElementById("phone-keypad-input").innerHTML;
    cData = {
        number: e,
        name: e
    }, $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: cData,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        cData.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : t.IsAvailable ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), "Ulaşılamıyor!") : ($(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".phone-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = cData.name, CallData.number = cData.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
}), S4.Phone.Functions.LoadContacts = function(t) {
    var e = $(".phone-contact-list");
    $(e).html("");
    var a = 0;
    $(".phone-contacts").hide(), $(".phone-recent").hide(), $(".phone-keypad").hide(), $(".phone-" + CurrentFooterTab).show(), $("#contact-search").on("keyup", function() {
        var t = $(this).val().toLowerCase();
        $(".phone-contact-list .phone-contact").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1)
        })
    }), null !== t ? ($.each(t, function(t, n) {
        var o = '<div class="phone-contact" data-contactid="' + t + '"><div class="phone-contact-firstletter" style="background-color: #e74c3c;">' + n.name.charAt(0).toUpperCase() + '</div><div class="phone-contact-name">' + n.name + '</div><div class="phone-contact-actions"><i class="fas fa-sort-down"></i></div><div class="phone-contact-action-buttons"> <i class="fas fa-phone-volume" id="phone-start-call"></i> <i class="fab fa-whatsapp" id="new-chat-phone" style="font-size: 2.5vh;"></i> <i class="fas fa-user-edit" id="edit-contact"></i> </div></div>';
        n.status && (o = '<div class="phone-contact" data-contactid="' + t + '"><div class="phone-contact-firstletter" style="background-color: #2ecc71;">' + n.name.charAt(0).toUpperCase() + '</div><div class="phone-contact-name">' + n.name + '</div><div class="phone-contact-actions"><i class="fas fa-sort-down"></i></div><div class="phone-contact-action-buttons"> <i class="fas fa-phone-volume" id="phone-start-call"></i> <i class="fab fa-whatsapp" id="new-chat-phone" style="font-size: 2.5vh;"></i> <i class="fas fa-user-edit" id="edit-contact"></i> </div></div>'), a += 1, $(e).append(o), $("[data-contactid='" + t + "']").data("contactData", n)
    }), $("#total-contacts").text(a + " Kayıtlı kişi")) : $("#total-contacts").text("Kayıtlı kimse yok")
}, $(document).on("click", "#new-chat-phone", function(t) {
    var e = $(this).parent().parent().data("contactid"),
        a = $("[data-contactid='" + e + "']").data("contactData");
    a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? ($.post("http://s4-phone/GetWhatsappChats", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadWhatsappChats(t)
    }), $(".phone-application-container").animate({
        top: "-160%"
    }), S4.Phone.Functions.HeaderTextColor("white", 400), setTimeout(function() {
        $(".phone-application-container").animate({
            top: "0%"
        }), S4.Phone.Functions.ToggleApp("phone", "none"), S4.Phone.Functions.ToggleApp("whatsapp", "block"), S4.Phone.Data.currentApplication = "whatsapp", $.post("http://s4-phone/GetWhatsappChat", JSON.stringify({
            phone: a.number
        }), function(t) {
            S4.Phone.Functions.SetupChatMessages(t, {
                name: a.name,
                number: a.number
            })
        }), $(".whatsapp-openedchat-messages").animate({
            scrollTop: 9999
        }, 150), $(".whatsapp-openedchat").css({
            display: "block"
        }), $(".whatsapp-openedchat").css({
            left: "0vh"
        }), $(".whatsapp-chats").animate({
            left: "30vh"
        }, 100, function() {
            $(".whatsapp-chats").css({
                display: "none"
            })
        })
    }, 400)) : S4.Phone.Notifications.Add("fas fa-sms", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_MSG_YOURSELF"))
});
var CurrentEditContactData = {};
$(document).on("click", "#edit-contact", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().data("contactid"),
        a = $("[data-contactid='" + e + "']").data("contactData");
    CurrentEditContactData.name = a.name, CurrentEditContactData.number = a.number, $(".phone-edit-contact-header").text("Editing: " + a.name), $(".phone-edit-contact-name").val(a.name), $(".phone-edit-contact-number").val(a.number), null != a.iban && null != a.iban ? ($(".phone-edit-contact-iban").val(a.iban), CurrentEditContactData.iban = a.iban) : ($(".phone-edit-contact-iban").val(""), CurrentEditContactData.iban = ""), S4.Phone.Animations.TopSlideDown(".phone-edit-contact", 200, 0)
}), $(document).on("click", "#edit-contact-save", function(t) {
    t.preventDefault();
    var e = $(".phone-edit-contact-name").val(),
        a = $(".phone-edit-contact-number").val(),
        n = $(".phone-edit-contact-iban").val();
    "" != e && "" != a ? ($.post("http://s4-phone/EditContact", JSON.stringify({
        CurrentContactName: e,
        CurrentContactNumber: a,
        CurrentContactIban: n,
        OldContactName: CurrentEditContactData.name,
        OldContactNumber: CurrentEditContactData.number,
        OldContactIban: CurrentEditContactData.iban
    }), function(t) {
        S4.Phone.Functions.LoadContacts(t)
    }), S4.Phone.Animations.TopSlideUp(".phone-edit-contact", 250, -100), setTimeout(function() {
        $(".phone-edit-contact-number").val(""), $(".phone-edit-contact-name").val("")
    }, 250)) : S4.Phone.Notifications.Add("fas fa-exclamation-circle", S4.Phone.Functions.Lang("CONTACTS_EDIT_TITLE"), S4.Phone.Functions.Lang("ALLFIELDS"))
}), $(document).on("click", "#edit-contact-delete", function(t) {
    t.preventDefault();
    var e = $(".phone-edit-contact-name").val(),
        a = $(".phone-edit-contact-number").val(),
        n = $(".phone-edit-contact-iban").val();
    $.post("http://s4-phone/DeleteContact", JSON.stringify({
        CurrentContactName: e,
        CurrentContactNumber: a,
        CurrentContactIban: n
    }), function(t) {
        S4.Phone.Functions.LoadContacts(t)
    }), S4.Phone.Animations.TopSlideUp(".phone-edit-contact", 250, -100), setTimeout(function() {
        $(".phone-edit-contact-number").val(""), $(".phone-edit-contact-name").val("")
    }, 250)
}), $(document).on("click", "#edit-contact-cancel", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".phone-edit-contact", 250, -100), setTimeout(function() {
        $(".phone-edit-contact-number").val(""), $(".phone-edit-contact-name").val("")
    }, 250)
}), $(document).on("click", ".phone-keypad-key", function(t) {
    t.preventDefault();
    var e = $(this).data("keypadvalue");
    if (isNaN(e))
        if ("#" == e) {
            a = $("#phone-keypad-input").text();
            $("#phone-keypad-input").text(a + e)
        } else "*" == e && null == ClearNumberTimer && ($("#phone-keypad-input").text("Silindi"), ClearNumberTimer = setTimeout(function() {
            $("#phone-keypad-input").text(""), ClearNumberTimer = null
        }, 750));
    else {
        var a = $("#phone-keypad-input").text();
        $("#phone-keypad-input").text(a + e)
    }
});
var OpenedContact = null;
$(document).on("click", ".phone-contact-actions", function(t) {
    t.preventDefault();
    var e = $(this).parent(),
        a = $(e).data("contactid");
    if (null === OpenedContact) $(e).animate({
        height: "12vh"
    }, 150, function() {
        $(e).find(".phone-contact-action-buttons").fadeIn(100)
    }), OpenedContact = a;
    else if (OpenedContact == a) $(e).find(".phone-contact-action-buttons").fadeOut(100, function() {
        $(e).animate({
            height: "4.5vh"
        }, 150)
    }), OpenedContact = null;
    else if (OpenedContact != a) {
        var n = $(".phone-contact-list").find('[data-contactid="' + OpenedContact + '"]');
        $(n).find(".phone-contact-action-buttons").fadeOut(100, function() {
            $(n).animate({
                height: "4.5vh"
            }, 150), OpenedContact = a
        }), $(e).animate({
            height: "12vh"
        }, 150, function() {
            $(e).find(".phone-contact-action-buttons").fadeIn(100)
        })
    }
}), $(document).on("click", "#phone-plus-icon", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideDown(".phone-add-contact", 200, 0)
}), $(document).on("click", "#add-contact-save", function(t) {
    t.preventDefault();
    var e = $(".phone-add-contact-name").val(),
        a = $(".phone-add-contact-number").val(),
        n = $(".phone-add-contact-iban").val();
    if ("" != e && "" != a) {
        if ($.post("http://s4-phone/AddNewContact", JSON.stringify({
                ContactName: e,
                ContactNumber: a,
                ContactIban: n
            }), function(t) {
                S4.Phone.Functions.LoadContacts(t)
            }), S4.Phone.Animations.TopSlideUp(".phone-add-contact", 250, -100), setTimeout(function() {
                $(".phone-add-contact-number").val(""), $(".phone-add-contact-name").val("")
            }, 250), null !== SelectedSuggestion) {
            $.post("http://s4-phone/RemoveSuggestion", JSON.stringify({
                data: $(SelectedSuggestion).data("SuggestionData")
            })), $(SelectedSuggestion).remove(), SelectedSuggestion = null;
            var o = parseInt(AmountOfSuggestions);
            o - 1 == 0 && (o = 0), $(".amount-of-suggested-contacts").html(o + " contacts")
        }
    } else S4.Phone.Notifications.Add("fas fa-exclamation-circle", S4.Phone.Functions.Lang("CONTACTS_ADD_TITLE"), S4.Phone.Functions.Lang("ALLFIELDS"))
}), $(document).on("click", "#add-contact-cancel", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".phone-add-contact", 250, -100), setTimeout(function() {
        $(".phone-add-contact-number").val(""), $(".phone-add-contact-name").val("")
    }, 250)
}), $(document).on("click", "#phone-start-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().data("contactid"),
        a = $("[data-contactid='" + e + "']").data("contactData");
    SetupCall(a)
}), SetupCall = function(t) {
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: t,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(e) {
        t.number !== S4.Phone.Data.PlayerData.charinfo.phone ? e.IsOnline ? e.CanCall ? e.InCall ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : e.IsAvailable ? S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), "Ulaşılamıyor!") : ($(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(t.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".phone-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = t.name, CallData.number = t.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone-volume", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
}, CancelOutgoingCall = function() {
    "phone-call" == S4.Phone.Data.currentApplication && (S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), setTimeout(function() {
        S4.Phone.Functions.ToggleApp(S4.Phone.Data.currentApplication, "none")
    }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), S4.Phone.Data.CallActive = !1, S4.Phone.Data.currentApplication = null)
}, $(document).on("click", "#outgoing-cancel", function(t) {
    t.preventDefault(), $.post("http://s4-phone/CancelOutgoingCall")
}), $(document).on("click", "#incoming-deny", function(t) {
    t.preventDefault(), $.post("http://s4-phone/DenyIncomingCall")
}), $(document).on("click", "#ongoing-cancel", function(t) {
    t.preventDefault(), $.post("http://s4-phone/CancelOngoingCall")
}), IncomingCallAlert = function(t, e, a) {
    e ? ($(".call-notifications").animate({
        right: "-35vh"
    }, 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), setTimeout(function() {
        $("." + S4.Phone.Data.currentApplication + "-app").css({
            display: "none"
        }), $(".phone-call-outgoing").css({
            display: "none"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".call-notifications").css({
            display: "block"
        })
    }, 400), S4.Phone.Functions.HeaderTextColor("white", 300), S4.Phone.Data.CallActive = !1, S4.Phone.Data.currentApplication = null) : (S4.Phone.Data.CallActive || (S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), S4.Phone.Animations.TopSlideUp("." + S4.Phone.Data.currentApplication + "-app", 400, -160), setTimeout(function() {
        var e = "Bu kişi seni arıyor: " + t.name;
        a && (e = "Gizli numaradan aranıyorsun."), $(".call-notifications-title").html("Gelen Arama"), $(".call-notifications-content").html(e), $(".call-notifications").css({
            display: "block"
        }), $(".call-notifications").animate({
            right: "5vh"
        }, 400), $(".phone-call-outgoing").css({
            display: "none"
        }), $(".phone-call-incoming").css({
            display: "block"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-incoming-caller").html(t.name), $(".phone-app").css({
            display: "none"
        }), S4.Phone.Functions.HeaderTextColor("white", 400), $("." + S4.Phone.Data.currentApplication + "-app").css({
            display: "none"
        }), $(".phone-call-app").css({
            display: "block"
        }), setTimeout(function() {
            S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0)
        }, 400)
    }, 400), S4.Phone.Data.currentApplication = "phone-call", S4.Phone.Data.CallActive = !0), setTimeout(function() {
        $(".call-notifications").addClass("call-notifications-shake"), setTimeout(function() {
            $(".call-notifications").removeClass("call-notifications-shake")
        }, 1e3)
    }, 400))
}, S4.Phone.Functions.SetupCurrentCall = function(t) {
    t.InCall ? (CallData = t, $(".phone-currentcall-container").css({
        display: "block"
    }), "incoming" == t.CallType ? $(".phone-currentcall-title").html("Gelen Arama") : "outgoing" == t.CallType ? $(".phone-currentcall-title").html("Giden Arama") : "ongoing" == t.CallType && $(".phone-currentcall-title").html("Süre: (" + t.CallTime + ")"), $.post("http://s4-phone/RehberVeriEkle", JSON.stringify({
        cData: t
    })), $(".phone-currentcall-contact").html("with " + t.TargetData.name)) : $(".phone-currentcall-container").css({
        display: "none"
    })
}, $(document).on("click", ".phone-currentcall-container", function(t) {
    t.preventDefault(), "incoming" == CallData.CallType ? ($(".phone-call-incoming").css({
        display: "block"
    }), $(".phone-call-outgoing").css({
        display: "none"
    }), $(".phone-call-ongoing").css({
        display: "none"
    })) : "outgoing" == CallData.CallType ? ($(".phone-call-incoming").css({
        display: "none"
    }), $(".phone-call-outgoing").css({
        display: "block"
    }), $(".phone-call-ongoing").css({
        display: "none"
    })) : "ongoing" == CallData.CallType && ($(".phone-call-incoming").css({
        display: "none"
    }), $(".phone-call-outgoing").css({
        display: "none"
    }), $(".phone-call-ongoing").css({
        display: "block"
    })), $(".phone-call-ongoing-caller").html(CallData.name), S4.Phone.Functions.HeaderTextColor("white", 500), S4.Phone.Animations.TopSlideDown(".phone-application-container", 500, 0), S4.Phone.Animations.TopSlideDown(".phone-call-app", 500, 0), S4.Phone.Functions.ToggleApp("phone-call", "block"), S4.Phone.Data.currentApplication = "phone-call"
}), $(document).on("click", "#incoming-answer", function(t) {
    t.preventDefault(), $.post("http://s4-phone/AnswerCall")
}), S4.Phone.Functions.AnswerCall = function(t) {
    $(".phone-call-incoming").css({
        display: "none"
    }), $(".phone-call-outgoing").css({
        display: "none"
    }), $(".phone-call-ongoing").css({
        display: "block"
    }), $(".phone-call-ongoing-caller").html(t.TargetData.name), S4.Phone.Functions.Close()
}, S4.Phone.Functions.SetupSuggestedContacts = function(t) {
    $(".suggested-contacts").html(""), (AmountOfSuggestions = t.length) > 0 ? ($(".amount-of-suggested-contacts").html(AmountOfSuggestions + " Kayıtlı kişi"), t = t.reverse(), $.each(t, function(t, e) {
        var a = '<div class="suggested-contact" id="suggest-' + t + '"><i class="fas fa-user-check"></i> <span class="suggested-name">' + e.name[0] + " " + e.name[1] + ' &middot; <span class="suggested-number">' + e.number + "</span></span> </div>";
        $(".suggested-contacts").append(a), $("#suggest-" + t).data("SuggestionData", e)
    })) : $(".amount-of-suggested-contacts").html("0 Kayıtlı kişi")
}, $(document).on("click", ".suggested-contact", function(t) {
    t.preventDefault();
    var e = $(this).data("SuggestionData");
    SelectedSuggestion = this, S4.Phone.Animations.TopSlideDown(".phone-add-contact", 200, 0), $(".phone-add-contact-name").val(e.name[0] + " " + e.name[1]), $(".phone-add-contact-number").val(e.number), $(".phone-add-contact-iban").val(e.bank)
});
var CurrentTwitterTab = "twitter-home",
    HashtagOpen = !1,
    MinimumTrending = 100;
let url;
$(document).on("click", ".twitter-header-tab", function(t) {
    t.preventDefault();
    var e = $(this).data("twittertab"),
        a = $(".twitter-header").find('[data-twittertab="' + CurrentTwitterTab + '"]');
    e !== CurrentTwitterTab ? ($(this).addClass("selected-twitter-header-tab"), $(a).removeClass("selected-twitter-header-tab"), $("." + CurrentTwitterTab + "-tab").css({
        display: "none"
    }), $("." + e + "-tab").css({
        display: "block"
    }), "twitter-mentions" === e && $.post("http://s4-phone/ClearMentions"), "twitter-home" == e && $.post("http://s4-phone/GetTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadTweets(t)
    }), "twitter-self" == e && $.post("http://s4-phone/GetSelfTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadSelfTweets(t)
    }), CurrentTwitterTab = e, HashtagOpen && (event.preventDefault(), $(".twitter-hashtag-tweets").css({
        left: "30vh"
    }), $(".twitter-hashtags").css({
        left: "0vh"
    }), $(".twitter-new-tweet").css({
        display: "block"
    }), $(".twitter-hashtags").css({
        display: "block"
    }), HashtagOpen = !1)) : "twitter-hashtags" == CurrentTwitterTab && "twitter-hashtags" == e ? HashtagOpen && (event.preventDefault(), $(".twitter-hashtags").css({
        display: "block"
    }), $(".twitter-hashtag-tweets").animate({
        left: "30vh"
    }, 150), $(".twitter-hashtags").animate({
        left: "0vh"
    }, 150), HashtagOpen = !1) : "twitter-home" == CurrentTwitterTab && "twitter-home" == e ? (event.preventDefault(), $.post("http://s4-phone/GetTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadTweets(t)
    })) : "twitter-mentions" == CurrentTwitterTab && "twitter-mentions" == e ? (event.preventDefault(), $.post("http://s4-phone/GetMentionedTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadMentionedTweets(t)
    })) : "twitter-self" == CurrentTwitterTab && "twitter-self" == e && (event.preventDefault(), $.post("http://s4-phone/GetSelfTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadSelfTweets(t)
    }))
}), $(document).on("click", ".twitter-new-tweet", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideDown(".twitter-new-tweet-tab", 450, 0)
}), S4.Phone.Notifications.LoadTweets = function(t) {
    if (null != (t = t.reverse()) && "" !== t && t.length > 0) $(".twitter-home-tab").html(""), $.each(t, function(t, e) {
        e.message;
        let a = new Date - new Date(e.time),
            n = Math.floor(a / 864e5),
            o = Math.floor(a % 864e5 / 36e5),
            i = Math.round(a % 864e5 % 36e5 / 6e4),
            s = Math.round(a / 1e3) + " s";
        i > 0 ? s = i + " m" : o > 0 ? s = o + " h" : n > 0 && (s = n + " d");
        let c = e.firstName + " " + e.lastName,
            l = "./img/default.png";
        if ("default" !== e.picture && (l = e.picture), "" == e.url && "" != e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-reply"><i class="fas fa-reply"></i></div>';
            $(".twitter-home-tab").append(t)
        } else if ("" != e.url && "" == e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><img class="image" src= "' + e.url + '" style = " border-radius:2px; width: 70%; position:relative; z-index: 1; left:52px; margin:.6rem .5rem .6rem 1rem;height: auto;"><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-reply"><i class="fas fa-reply"></i></div>';
            $(".twitter-home-tab").append(t)
        } else if ("" != e.url && "" != e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><img class="image" src= "' + e.url + '" style = " border-radius:2px; width: 70%; position:relative; z-index: 1; left:52px; margin:.6rem .5rem .6rem 1rem;height: auto;"><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-reply"><i class="fas fa-reply"></i></div>';
            $(".twitter-home-tab").append(t)
        }
    });
    else {
        let t = '<div class="twitter-no-tweets"><p>Burada herhangi bir tweet yok</p></div>';
        $(".twitter-home-tab").html(t)
    }
}, S4.Phone.Notifications.LoadSelfTweets = function(t) {
    if (null != (t = t.reverse()) && "" !== t && t.length > 0) $(".twitter-self-tab").html(""), $.each(t, function(t, e) {
        let a = new Date - new Date(e.time),
            n = Math.floor(a / 864e5),
            o = Math.floor(a % 864e5 / 36e5),
            i = Math.round(a % 864e5 % 36e5 / 6e4),
            s = Math.round(a / 1e3) + " s";
        i > 0 ? s = i + " m" : o > 0 ? s = o + " h" : n > 0 && (s = n + " d");
        let c = e.firstName + " " + e.lastName,
            l = "./img/default.png";
        if ("default" !== e.picture && (l = e.picture), "" == e.url && "" != e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-delete"><i class="fas fa-trash-alt"></i></div>';
            $(".twitter-self-tab").append(t)
        } else if ("" != e.url && "" == e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><img class="image" src= "' + e.url + '" style = " border-radius:2px; width: 70%; position:relative; z-index: 1; left:52px; margin:.6rem .5rem .6rem 1rem;height: auto;"><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-delete"><i class="fas fa-trash-alt"></i></div>';
            $(".twitter-self-tab").append(t)
        } else if ("" != e.url && "" != e.message) {
            let t = '<div class="twitter-tweet" data-twtid = "' + e.id + '" data-twthandler="@' + c.replace(" ", "_") + '"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + c.replace(" ", "_") + " &middot; " + s + '</span></div><div class="tweet-message">' + e.message + '</div><img class="image" src= "' + e.url + '" style = " border-radius:2px; width: 70%; position:relative; z-index: 1; left:52px; margin:.6rem .5rem .6rem 1rem;height: auto;"><div class="twt-img" style="top: 1vh;"><img src="' + l + '" class="tweeter-image"></div><div class="tweet-delete"><i class="fas fa-trash-alt"></i></div>';
            $(".twitter-self-tab").append(t)
        }
    });
    else {
        let t = '<div class="twitter-no-tweets"><p>Burada herhangi bir tweet yok!</p></div>';
        $(".twitter-self-tab").html(t)
    }
}, $(document).on("click", ".tweet-reply", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("twthandler");
    $(this).parent().data();
    $("#tweet-new-message").val(e), S4.Phone.Animations.TopSlideDown(".twitter-new-tweet-tab", 450, 0)
}), $(document).on("click", ".tweet-delete", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("twtid");
    $.post("http://s4-phone/DeleteTweet", JSON.stringify({
        id: e
    })), $.post("http://s4-phone/GetSelfTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadSelfTweets(t)
    }), $.post("http://s4-phone/GetTweets", JSON.stringify({}), function(t) {
        S4.Phone.Notifications.LoadTweets(t)
    })
});
let clicked = !1,
    photos = [];

function CopyMentionTag(t) {
    var e = $("<input>");
    $("body").append(e), e.val($(t).data("mentiontag")).select(), S4.Phone.Notifications.Add("fab fa-twitter", S4.Phone.Functions.Lang("TWITTER_TITLE"), $(t).data("mentiontag") + " Copied!", "rgb(27, 149, 224)", 1250), document.execCommand("copy"), e.remove()
}
$(document).on("click", ".image", function(t) {
    if (clicked) {
        for (let t = 0; t < photos.length; t++) photos[t].remove();
        clicked = !1
    } else {
        let t = $(this).clone();
        $(t).appendTo(".tt"), $(t).css({
            position: "absolute",
            width: "500px",
            height: "auto",
            left: "-520px",
            top: "-10px",
            "border-radius": "1rem"
        }), clicked = !0, photos.push(t)
    }
}), S4.Phone.Notifications.LoadMentionedTweets = function(t) {
    (t = t.reverse()).length > 0 && ($(".twitter-mentions-tab").html(""), $.each(t, function(t, e) {
        var a = e.message,
            n = new Date - new Date(e.time),
            o = Math.floor(n / 864e5),
            i = Math.floor(n % 864e5 / 36e5),
            s = Math.round(n % 864e5 % 36e5 / 6e4),
            c = Math.round(n / 1e3),
            l = c + " sn";
        c > 60 ? l = s + " dk" : s > 60 ? l = i + " s" : i > 24 && (l = o + " d");
        var r = e.firstName + " " + e.lastName,
            p = "./img/default.png";
        "default" !== e.picture && (p = e.picture);
        var d = '<div class="twitter-tweet"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + r.replace(" ", "_") + " &middot; " + l + '</span></div><div class="tweet-message">' + a + '</div><div class="twt-img" style="top: 1vh;"><img src="' + p + '" class="tweeter-image"></div></div>';
        $(".twitter-mentioned-tweet").css({
            "background-color": "#F5F8FA"
        }), $(".twitter-mentions-tab").append(d)
    }))
}, S4.Phone.Functions.FormatTwitterMessage = function(t) {
    var e = t,
        a = e.split("@"),
        n = e.split("#"),
        o = ["[", "?", "!", "@", "#", "]"];
    for (i = 1; i < a.length; i++) {
        var s = a[i].split(" ")[0];
        null != s && "" !== s && (e = e.replace("@" + s, "<span class='mentioned-tag' data-mentiontag='@" + s + "' style='color: rgb(27, 149, 224);'>@" + s + "</span>"))
    }
    for (i = 1; i < n.length; i++) {
        var c = n[i].split(" ")[0];
        for (i = 1; i < o.length; i++) {
            var l = o[i];
            (a = c.indexOf(l)) > -1 && (c = c.replace(l, ""))
        }
        null != c && "" !== c && (e = e.replace("#" + c, "<span class='hashtag-tag-text' data-hashtag='" + c + "' style='color: rgb(27, 149, 224);'>#" + c + "</span>"))
    }
    return e
}, $(document).on("click", "#send-tweet", function(t) {
    t.preventDefault();
    var e = $("#tweet-new-message").val(),
        a = $("#tweet-new-url").val();
    if ("" != e || "" != a) {
        let t = new Date;
        $.post("http://s4-phone/PostNewTweet", JSON.stringify({
            Message: e,
            Foto: a,
            Date: t,
            Picture: S4.Phone.Data.MetaData.profilepicture
        }), function(t) {
            S4.Phone.Notifications.LoadTweets(t)
        }), $.post("http://s4-phone/GetHashtags", JSON.stringify({}), function(t) {
            S4.Phone.Notifications.LoadHashtags(t)
        }), S4.Phone.Animations.TopSlideUp(".twitter-new-tweet-tab", 450, -120), $("#tweet-new-url").val(""), $("#tweet-new-message").val("")
    } else S4.Phone.Notifications.Add("fab fa-twitter", S4.Phone.Functions.Lang("TWITTER_TITLE"), S4.Phone.Functions.Lang("TWITTER_ENTER_MSG"), "#1DA1F2")
}), $(document).on("click", "#send-photo", function(t) {
    t.preventDefault(), $("#tweet-new-url").val(""), $.post("http://s4-phone/PostNewImage", JSON.stringify({}), function(t) {
        $("#tweet-new-url").val(t)
    }), S4.Phone.Functions.Close()
}), $(document).on("click", "#cancel-tweet", function(t) {
    t.preventDefault(), $("#tweet-new-url").val(""), $("#tweet-new-message").val(""), S4.Phone.Animations.TopSlideUp(".twitter-new-tweet-tab", 450, -120)
}), $(document).on("click", ".mentioned-tag", function(t) {
    t.preventDefault(), CopyMentionTag(this)
}), $(document).on("click", ".hashtag-tag-text", function(t) {
    if (t.preventDefault(), !HashtagOpen) {
        var e = $(this).data("hashtag"),
            a = $(".twitter-header").find('[data-twittertab="' + CurrentTwitterTab + '"]');
        $("#twitter-hashtags").addClass("selected-twitter-header-tab"), $(a).removeClass("selected-twitter-header-tab"), $("." + CurrentTwitterTab + "-tab").css({
            display: "none"
        }), $(".twitter-hashtags-tab").css({
            display: "block"
        }), $.post("http://s4-phone/GetHashtagMessages", JSON.stringify({
            hashtag: e
        }), function(t) {
            S4.Phone.Notifications.LoadHashtagMessages(t.messages)
        }), $(".twitter-hashtag-tweets").css({
            display: "block",
            left: "30vh"
        }), $(".twitter-hashtag-tweets").css({
            left: "0vh"
        }), $(".twitter-hashtags").css({
            left: "-30vh"
        }), $(".twitter-hashtags").css({
            display: "none"
        }), HashtagOpen = !0, CurrentTwitterTab = "twitter-hashtags"
    }
}), S4.Phone.Notifications.LoadHashtags = function(t) {
    null !== t && ($(".twitter-hashtags").html(""), $.each(t, function(t, e) {
        var a = "",
            n = "Tweet";
        e.messages.length > 1 && (n = "Tweets"), a = e.messages.length >= MinimumTrending ? '<div class="twitter-hashtag" id="tag-' + e.hashtag + '"><div class="twitter-hashtag-status">Trending</div> <div class="twitter-hashtag-tag">#' + e.hashtag + '</div> <div class="twitter-hashtag-messages">' + e.messages.length + " " + n + "</div> </div>" : '<div class="twitter-hashtag" id="tag-' + e.hashtag + '"><div class="twitter-hashtag-status">Not Trending</div> <div class="twitter-hashtag-tag">#' + e.hashtag + '</div> <div class="twitter-hashtag-messages">' + e.messages.length + " " + n + "</div> </div>", $(".twitter-hashtags").append(a), $("#tag-" + e.hashtag).data("tagData", e)
    }))
}, S4.Phone.Notifications.LoadHashtagMessages = function(t) {
    null != (t = t.reverse()) && "" !== t && t.length > 0 && ($(".twitter-hashtag-tweets").html(""), $.each(t, function(t, e) {
        var a = S4.Phone.Functions.FormatTwitterMessage(e.message),
            n = new Date - new Date(e.time),
            o = Math.floor(n / 864e5),
            i = Math.floor(n % 864e5 / 36e5),
            s = Math.round(n % 864e5 % 36e5 / 6e4),
            c = Math.round(n / 1e3),
            l = c + " sn";
        c > 60 ? l = s + " dk" : s > 60 ? l = i + " s" : i > 24 && (l = o + " d");
        var r = e.firstName + " " + e.lastName,
            p = "./img/default.png";
        "default" !== e.picture && (p = e.picture);
        var d = '<div class="twitter-tweet"><div class="tweet-tweeter">' + e.firstName + " " + e.lastName + " &nbsp;<span>@" + r.replace(" ", "_") + " &middot; " + l + '</span></div><div class="tweet-message">' + a + '</div><div class="twt-img" style="top: 1vh;"><img src="' + p + '" class="tweeter-image"></div></div>';
        $(".twitter-hashtag-tweets").append(d)
    }))
}, $(document).on("click", ".twitter-hashtag", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("tagData");
    S4.Phone.Notifications.LoadHashtagMessages(a.messages), $(".twitter-hashtag-tweets").css({
        display: "block",
        left: "30vh"
    }), $(".twitter-hashtag-tweets").animate({
        left: "0vh"
    }, 150), $(".twitter-hashtags").animate({
        left: "-30vh"
    }, 150, function() {
        $(".twitter-hashtags").css({
            display: "none"
        })
    }), HashtagOpen = !0
});
var WhatsappSearchActive = !1,
    OpenedChatPicture = null;
$(document).ready(function() {
    $("#whatsapp-search-input").on("keyup", function() {
        var t = $(this).val().toLowerCase();
        $(".whatsapp-chats .whatsapp-chat").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1)
        })
    })
}), $(document).on("click", "#whatsapp-search-chats", function(t) {
    t.preventDefault(), "none" == $("#whatsapp-search-input").css("display") ? ($("#whatsapp-search-input").fadeIn(150), WhatsappSearchActive = !0) : ($("#whatsapp-search-input").fadeOut(150), WhatsappSearchActive = !1)
}), $(document).on("click", ".whatsapp-chat", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("chatdata");
    S4.Phone.Functions.SetupChatMessages(a), $.post("http://s4-phone/ClearAlerts", JSON.stringify({
        number: a.number
    })), WhatsappSearchActive && $("#whatsapp-search-input").fadeOut(150), $(".whatsapp-openedchat").css({
        display: "block"
    }), $(".whatsapp-openedchat").animate({
        left: "0vh"
    }, 200), $(".whatsapp-chats").animate({
        left: "30vh"
    }, 200, function() {
        $(".whatsapp-chats").css({
            display: "none"
        })
    }), $(".whatsapp-openedchat-messages").animate({
        scrollTop: 9999
    }, 150), null == OpenedChatPicture && (OpenedChatPicture = "./img/default.png", null == a.picture && null == a.picture && "default" == a.picture || (OpenedChatPicture = a.picture), $(".whatsapp-openedchat-picture").css({
        "background-image": "url(" + OpenedChatPicture + ")"
    }))
}), $(document).on("click", "#whatsapp-openedchat-back", function(t) {
    t.preventDefault(), $.post("http://s4-phone/GetWhatsappChats", JSON.stringify({}), function(t) {
        S4.Phone.Functions.LoadWhatsappChats(t)
    }), OpenedChatData.number = null, $(".whatsapp-chats").css({
        display: "block"
    }), $(".whatsapp-chats").animate({
        left: "0vh"
    }, 200), $(".whatsapp-openedchat").animate({
        left: "-30vh"
    }, 200, function() {
        $(".whatsapp-openedchat").css({
            display: "none"
        })
    }), OpenedChatPicture = null
}), S4.Phone.Functions.GetLastMessage = function(t) {
    var e = new Date,
        a = (e.getMonth(), e.getDate(), e.getFullYear(), {
            time: "00:00",
            message: "nikss"
        });
    return $.each(t[t.length - 1], function(t, e) {
        var n = e[e.length - 1];
        a.time = n.time, a.message = n.message
    }), a
}, GetCurrentDateKey = function() {
    var t = new Date,
        e = t.getMonth();
    return t.getDate() + "-" + e + "-" + t.getFullYear()
}, S4.Phone.Functions.LoadWhatsappChats = function(t) {
    $(".whatsapp-chats").html(""), $.each(t, function(t, e) {
        var a = "./img/default.png";
        "default" !== e.picture && (a = e.picture);
        var n = S4.Phone.Functions.GetLastMessage(e.messages),
            o = '<div class="whatsapp-chat" id="whatsapp-chat-' + t + '"><div class="whatsapp-chat-picture" style="background-image: url(' + a + ');"></div><div class="whatsapp-chat-name"><p>' + e.name + '</p></div><div class="whatsapp-chat-lastmessage"><p>' + n.message + '</p></div> <div class="whatsapp-chat-lastmessagetime"><p>' + n.time + '</p></div><div class="whatsapp-chat-unreadmessages unread-chat-id-' + t + '">1</div></div>';
        $(".whatsapp-chats").append(o), $("#whatsapp-chat-" + t).data("chatdata", e), e.Unread > 0 && void 0 !== e.Unread && null !== e.Unread ? ($(".unread-chat-id-" + t).html(e.Unread), $(".unread-chat-id-" + t).css({
            display: "block"
        })) : $(".unread-chat-id-" + t).css({
            display: "none"
        })
    })
}, S4.Phone.Functions.ReloadWhatsappAlerts = function(t) {
    $.each(t, function(t, e) {
        e.Unread > 0 && void 0 !== e.Unread && null !== e.Unread ? ($(".unread-chat-id-" + t).html(e.Unread), $(".unread-chat-id-" + t).css({
            display: "block"
        })) : $(".unread-chat-id-" + t).css({
            display: "none"
        })
    })
};
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function gifgonder(t) {
    $.post("http://s4-phone/SendMessage", JSON.stringify({
        ChatNumber: OpenedChatData.number,
        ChatDate: GetCurrentDateKey(),
        ChatMessage: $("#gif_" + t).attr("src"),
        ChatTime: FormatMessageTime(),
        ChatType: "gif"
    })), $(".gifler").css("display", "none")
}

function gifkapat() {
    $(".gifler").css("display", "none")
}
FormatChatDate = function(t) {
    var e = t.split("-"),
        a = new Date(parseInt(e[1]) + 1 + "-" + e[0] + "-" + e[2]),
        n = monthNames[a.getMonth()],
        o = a.getDate(),
        i = a.getFullYear(),
        s = o + "-" + a.getMonth() + "-" + i,
        c = o + " " + n + " " + i;
    return GetCurrentDateKey() == s && (c = "Today"), c
}, FormatMessageTime = function() {
    var t = new Date,
        e = t.getHours(),
        a = t.getMinutes(),
        n = a,
        o = e;
    return a < 10 && (n = "0" + a), e < 10 && (o = "0" + e), o + ":" + n
}, $(document).on("click", "#whatsapp-openedchat-send", function(t) {
    t.preventDefault();
    var e = $("#whatsapp-openedchat-message").val();
    null != e && "" !== e ? ($.post("http://s4-phone/SendMessage", JSON.stringify({
        ChatNumber: OpenedChatData.number,
        ChatDate: GetCurrentDateKey(),
        ChatMessage: e,
        ChatTime: FormatMessageTime(),
        ChatType: "message"
    })), $("#whatsapp-openedchat-message").val("")) : S4.Phone.Notifications.Add("fab fa-whatsapp", S4.Phone.Functions.Lang("WHATSAPP_TITLE"), S4.Phone.Functions.Lang("WHATSAPP_BLANK_MSG"), "#25D366", 1750)
}), $(document).on("keypress", function(t) {
    if (null !== OpenedChatData.number && 13 === t.which) {
        var e = $("#whatsapp-openedchat-message").val();
        null != e && "" !== e ? ($.post("http://s4-phone/SendMessage", JSON.stringify({
            ChatNumber: OpenedChatData.number,
            ChatDate: GetCurrentDateKey(),
            ChatMessage: e,
            ChatTime: FormatMessageTime(),
            ChatType: "message"
        })), $("#whatsapp-openedchat-message").val("")) : S4.Phone.Notifications.Add("fab fa-whatsapp", S4.Phone.Functions.Lang("WHATSAPP_TITLE"), S4.Phone.Functions.Lang("WHATSAPP_BLANK_MSG"), "#25D366", 1750)
    }
}), $(document).on("click", "#send-location", function(t) {
    t.preventDefault(), $.post("http://s4-phone/SendMessage", JSON.stringify({
        ChatNumber: OpenedChatData.number,
        ChatDate: GetCurrentDateKey(),
        ChatMessage: "Shared Location",
        ChatTime: FormatMessageTime(),
        ChatType: "location"
    }))
}), $(document).on("click", "#send-gif", function(t) {
    t.preventDefault(), $(".gifler").css("display", "block")
});
var wpfoto = null;

function gonderwp() {
    $.post("http://s4-phone/SendMessage", JSON.stringify({
        ChatNumber: OpenedChatData.number,
        ChatDate: GetCurrentDateKey(),
        ChatMessage: wpfoto,
        ChatTime: FormatMessageTime(),
        ChatType: "foto"
    })), $(".wpfoto").css("display", "none")
}

function iptalwp() {
    $(".wpfoto").css("display", "none"), wpfoto = null
}
$(document).on("click", "#send-image", function(t) {
    t.preventDefault(), $.post("http://s4-phone/PostNewImage", JSON.stringify({}), function(t) {
        $(".wpfoto").css("display", "block"), $(".wpfoto img").attr("src", t), wpfoto = t
    }), S4.Phone.Functions.Close()
}), S4.Phone.Functions.SetupChatMessages = function(t, e) {
    if (t) OpenedChatData.number = t.number, null == OpenedChatPicture ? $.post("http://s4-phone/GetProfilePicture", JSON.stringify({
        number: OpenedChatData.number
    }), function(t) {
        OpenedChatPicture = "./img/default.png", "default" != t && null != t && (OpenedChatPicture = t), $(".whatsapp-openedchat-picture").css({
            "background-image": "url(" + OpenedChatPicture + ")"
        })
    }) : $(".whatsapp-openedchat-picture").css({
        "background-image": "url(" + OpenedChatPicture + ")"
    }), $(".whatsapp-openedchat-name").html("<p>" + t.name + "</p>"), $(".whatsapp-openedchat-messages").html(""), $.each(t.messages, function(e, a) {
        var n = FormatChatDate(a.date),
            o = '<div class="whatsapp-openedchat-messages-' + e + ' unique-chat"><div class="whatsapp-openedchat-date">' + n + "</div></div>";
        $(".whatsapp-openedchat-messages").append(o), $.each(t.messages[e].messages, function(t, a) {
            var n, o = "me";
            a.sender !== S4.Phone.Data.PlayerData.identifier && (o = "other"), "message" == a.type ? n = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-' + o + '">' + a.message + '<div class="whatsapp-openedchat-message-time">' + a.time + '</div></div><div class="clearfix"></div>' : "location" == a.type ? n = '<div class="whatsapp-openedchat-message whatsapp-openedchat-message-' + o + ' whatsapp-shared-location" data-x="' + a.data.x + '" data-y="' + a.data.y + '"><span style="font-size: 1.2vh;"><i class="fas fa-thumbtack" style="font-size: 1vh;"></i> Paylaşılan Konum</span><div class="whatsapp-openedchat-message-time">' + a.time + '</div></div><div class="clearfix"></div>' : "foto" == a.type ? n = '<div style="max-width: 100%;" class="whatsapp-openedchat-message whatsapp-openedchat-message-' + o + '"><img src="' + a.message + '" style="    width: 165px;" /><div class="whatsapp-openedchat-message-time">' + a.time + '</div></div><div class="clearfix"></div>' : "gif" == a.type && (n = '<div style="max-width: 100%;" class="whatsapp-openedchat-message whatsapp-openedchat-message-' + o + '"><img src="' + a.message + '" style="    width: 165px;" /><div class="whatsapp-openedchat-message-time">' + a.time + '</div></div><div class="clearfix"></div>'), $(".whatsapp-openedchat-messages-" + e).append(n)
        })
    }), $(".whatsapp-openedchat-messages").animate({
        scrollTop: 9999
    }, 1);
    else {
        OpenedChatData.number = e.number, null == OpenedChatPicture && $.post("http://s4-phone/GetProfilePicture", JSON.stringify({
            number: OpenedChatData.number
        }), function(t) {
            OpenedChatPicture = "./img/default.png", "default" != t && null != t && (OpenedChatPicture = t), $(".whatsapp-openedchat-picture").css({
                "background-image": "url(" + OpenedChatPicture + ")"
            })
        }), $(".whatsapp-openedchat-name").html("<p>" + e.name + "</p>"), $(".whatsapp-openedchat-messages").html("");
        var a = new Date,
            n = a.getMonth(),
            o = '<div class="whatsapp-openedchat-messages-' + (a.getDate() + "-" + (n + 1) + "-" + a.getFullYear()) + ' unique-chat"><div class="whatsapp-openedchat-date">VANDAAG</div></div>';
        $(".whatsapp-openedchat-messages").append(o)
    }
    $(".whatsapp-openedchat-messages").animate({
        scrollTop: 9999
    }, 1)
}, $(document).on("click", ".whatsapp-shared-location", function(t) {
    t.preventDefault();
    var e = {};
    e.x = $(this).data("x"), e.y = $(this).data("y"), $.post("http://s4-phone/SharedLocation", JSON.stringify({
        coords: e
    }))
});
var ExtraButtonsOpen = !1;

function httpGetAsync(t, e) {
    var a = new XMLHttpRequest;
    a.onreadystatechange = function() {
        4 == a.readyState && 200 == a.status && e(a.responseText)
    }, a.open("GET", t, !0), a.send(null)
}

function tenorCallback_search(t) {
    var e, a = JSON.parse(t);
    for (top_10_gifs = a.results, e = 0; e < top_10_gifs.length; e++) {
        var n = top_10_gifs[e].media[0].tinygif.url;
        $(".gifs").html(`<a href="javascript:gifgonder('${e}')"><img class="share_gif" id="gif_${e}"  src="${n}" alt=""  ></a><br>` + $(".gifs").html())
    }
}

function grab_data(t) {
    httpGetAsync("https://g.tenor.com/v1/search?q=" + t + "&key=LIVDSRZULELA&limit=8", tenorCallback_search)
}

function getirgifdata() {
    $(".gifs").html(""), grab_data($("#gifinput").val())
}
$(document).on("click", "#whatsapp-openedchat-message-extras", function(t) {
    t.preventDefault(), ExtraButtonsOpen ? $(".whatsapp-extra-buttons").animate({
        left: "-15vh"
    }, 250, function() {
        $(".whatsapp-extra-buttons").css({
            display: "block"
        }), ExtraButtonsOpen = !1
    }) : ($(".whatsapp-extra-buttons").css({
        display: "block"
    }).animate({
        left: "0vh"
    }, 250), ExtraButtonsOpen = !0)
}), SetupArrests = function(t) {
    if ($(".arrests2-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="arrests-list" id="arrestsid-' + t + '"> <div class="arrests-list-firstletter">' + e.name.charAt(0).toUpperCase() + '</div> <div class="arrests-list-fullname">' + e.name + "</div> </div>";
        $(".arrests2-list").append(a), $("#arrestsid-" + t).data("arrestsData", e)
    });
    else {
        $(".arrests2-list").append('<div class="arrests-list"><div class="no-arrests">Aranan kimse yok.</div></div>')
    }
};
var FoccusedBank = null;
$(document).on("click", ".bank-app-account", function(t) {
    var e = document.getElementById("iban-account");
    e.select(), e.setSelectionRange(0, 99999), document.execCommand("copy"), S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), "IBAN Kopyalandı!", "#badc58", 1750)
});
var CurrentTab = "accounts";
$(document).on("click", ".bank-app-header-button", function(t) {
    t.preventDefault();
    var e = $(this).data("headertype");
    if (CurrentTab != e) {
        var a = $(".bank-app-header").find('[data-headertype="' + CurrentTab + '"]');
        "invoices" == e ? ($(".bank-app-" + CurrentTab).animate({
            left: "-30vh"
        }, 250, function() {
            $(".bank-app-" + CurrentTab).css({
                display: "none"
            })
        }), $(".bank-app-" + e).css({
            display: "block"
        }).animate({
            left: "0vh"
        }, 250)) : "accounts" == e && ($(".bank-app-" + CurrentTab).animate({
            left: "30vh"
        }, 250, function() {
            $(".bank-app-" + CurrentTab).css({
                display: "none"
            })
        }), $(".bank-app-" + e).css({
            display: "block"
        }).animate({
            left: "0vh"
        }, 250)), $(a).removeClass("bank-app-header-button-selected"), $(this).addClass("bank-app-header-button-selected"), setTimeout(function() {
            CurrentTab = e
        }, 300)
    }
}), S4.Phone.Functions.DoBankOpen = function(t) {
    $(".usernamebank").html(t.username), $(".bank-app-account-number").val("IBAN: " + t.iban), $(".bank-app-account-balance").html("&dollar;" + t.bank.toFixed()), $(".bank-app-account-balance").data("balance", t.bank.toFixed()), $(".bank-app-loaded").css({
        display: "none",
        "padding-left": "30vh"
    }), $(".bank-app-accounts").css({
        left: "30vh"
    }), $(".bank-logo").css({
        left: "0vh"
    }), $("#bank-text").css({
        opacity: "0.0",
        left: "9vh"
    }), $(".bank-app-loading").css({
        display: "block",
        left: "0vh"
    }), setTimeout(function() {
        CurrentTab = "accounts", setTimeout(function() {
            $("#bank-text").animate({
                opacity: 1,
                left: "14vh"
            })
        }, 100), setTimeout(function() {
            $(".bank-app-loaded").css({
                display: "block"
            }).animate({
                "padding-left": "0"
            }, 300), $(".bank-app-accounts").animate({
                left: "0vh"
            }, 300), $(".bank-app-loading").animate({
                left: "-30vh"
            }, 300, function() {
                $(".bank-app-loading").css({
                    display: "none"
                })
            })
        }, 1500)
    }, 500)
}, $(document).on("click", ".bank-app-account-actions", function(t) {
    S4.Phone.Animations.TopSlideDown(".bank-app-transfer", 400, 0)
}), $(document).on("click", "#cancel-transfer", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".bank-app-transfer", 400, -100)
}), $(document).on("click", "#accept-transfer", function(t) {
    t.preventDefault();
    var e = $("#bank-transfer-iban").val(),
        a = Number($("#bank-transfer-amount").val()),
        n = Number($(".bank-app-account-balance").data("balance"));
    "" != e && "" != a && a > 0 ? n >= a ? ($.post("http://s4-phone/TransferMoney", JSON.stringify({
        iban: e,
        amount: a
    }), function(t) {
        t.CanTransfer ? ($("#bank-transfer-iban").val(""), $("#bank-transfer-amount").val(""), t.NewAmount = t.NewAmount.toFixed(), $(".bank-app-account-balance").html("&euro;" + t.NewAmount), $(".bank-app-account-balance").data("balance", t.NewAmount), S4.Phone.Notifications.Add("fas fa-university", "hazeBank", "Şu kadar; " + a + ",- $ para transfer edildi!", "#badc58", 1500)) : S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("BANK_DONT_ENOUGH"), "#badc58", 1500)
    }), S4.Phone.Animations.TopSlideUp(".bank-app-transfer", 400, -100)) : S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("BANK_DONT_ENOUGH"), "#badc58", 1500) : S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("ALLFIELDS"), "#badc58", 1750)
}), $(document).on("click", ".pay-invoice", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().attr("id"),
        a = $("#" + e).data("invoicedata");
    $(".bank-app-account-balance").data("balance") >= a.amount ? $.post("http://s4-phone/PayInvoice", JSON.stringify({
        sender: a.sender,
        amount: a.amount,
        invoiceId: a.id
    }), function(t) {
        if (t) {
            $("#" + e).animate({
                left: "30vh"
            }, 300, function() {
                setTimeout(function() {
                    $("#" + e).remove()
                }, 100)
            }), S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), "You have &euro;" + a.amount + " paid!", "#badc58", 1500);
            var n = ($(".bank-app-account-balance").data("balance") - a.amount).toFixed();
            $("#bank-transfer-amount").val(n), $(".bank-app-account-balance").data("balance", n)
        } else S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("BANK_DONT_ENOUGH"), "#badc58", 1500)
    }) : S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("BANK_DONT_ENOUGH"), "#badc58", 1500)
}), $(document).on("click", ".decline-invoice", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().attr("id"),
        a = $("#" + e).data("invoicedata");
    $.post("http://s4-phone/DeclineInvoice", JSON.stringify({
        sender: a.sender,
        amount: a.amount,
        invoiceId: a.invoiceid
    })), $("#" + e).animate({
        left: "30vh"
    }, 300, function() {
        setTimeout(function() {
            $("#" + e).remove()
        }, 100)
    }), S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), "Je hebt &euro;" + a.amount + " betaald!", "#badc58", 1500)
}), S4.Phone.Functions.LoadBankInvoices = function(t) {
    null !== t && ($(".bank-app-invoices-list").html(""), $.each(t, function(t, e) {
        var a = '<div class="bank-app-invoice" id="invoiceid-' + e.id + '"> <div class="bank-app-invoice-title">' + e.label + ' <span style="font-size: 1vh; color: gray;">(Gönderen: ' + e.number + ')</span></div> <div class="bank-app-invoice-amount">$ ' + e.amount + '</div> <div class="bank-app-invoice-buttons"> <i class="fas fa-check-circle pay-invoice"></i></div> </div>';
        $(".bank-app-invoices-list").append(a), $("#invoiceid-" + e.id).data("invoicedata", e)
    }))
}, S4.Phone.Functions.LoadContactsWithNumber = function(t) {
    var e = $(".bank-app-my-contacts-list");
    $(e).html("");
    $("#bank-app-my-contact-search").on("keyup", function() {
        var t = $(this).val().toLowerCase();
        $(".bank-app-my-contacts-list .bank-app-my-contact").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1)
        })
    }), null !== t && $.each(t, function(t, a) {
        var n = Math.floor(6 * Math.random()),
            o = (S4.Phone.ContactColors[n], '<div class="bank-app-my-contact" data-bankcontactid="' + t + '"> <div class="bank-app-my-contact-firstletter">' + a.name.charAt(0).toUpperCase() + '</div> <div class="bank-app-my-contact-name">' + a.name + "</div> </div>");
        1, $(e).append(o), $("[data-bankcontactid='" + t + "']").data("contactData", a)
    })
}, $(document).on("click", ".bank-app-my-contacts-list-back", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideUp(".bank-app-my-contacts", 400, -100)
}), $(document).on("click", ".bank-transfer-mycontacts-icon", function(t) {
    t.preventDefault(), S4.Phone.Animations.TopSlideDown(".bank-app-my-contacts", 400, 0)
}), $(document).on("click", ".bank-app-my-contact", function(t) {
    t.preventDefault();
    var e = $(this).data("contactData");
    "" !== e.iban && void 0 !== e.iban && null !== e.iban ? $("#bank-transfer-iban").val(e.iban) : S4.Phone.Notifications.Add("fas fa-university", S4.Phone.Functions.Lang("BANK_TITLE"), S4.Phone.Functions.Lang("BANK_NOIBAN"), "#badc58", 2500), S4.Phone.Animations.TopSlideUp(".bank-app-my-contacts", 400, -100)
});
var SelectedCryptoTab = Config.DefaultCryptoPage,
    ActionTab = null;
$(".cryptotab-" + SelectedCryptoTab).css({
    display: "block"
}), $(".crypto-header-footer").find('[data-cryptotab="' + SelectedCryptoTab + '"]').addClass("crypto-header-footer-item-selected");
var CryptoData = [];

function SetupCryptoData(t) {
    CryptoData.History = t.History, CryptoData.Portfolio = t.Portfolio.toFixed(6), CryptoData.Worth = t.Worth, CryptoData.WalletId = t.WalletId, $(".crypto-action-page-wallet").html("Portefeuille: " + CryptoData.Portfolio + " Qbit('s)"), $(".crypto-walletid").html(CryptoData.WalletId), $(".cryptotab-course-list").html(""), CryptoData.History.length > 0 && (CryptoData.History = CryptoData.History.reverse(), $.each(CryptoData.History, function(t, e) {
        var a = (e.NewWorth - e.PreviousWorth) / e.PreviousWorth * 100,
            n = '<span style="color: green;" class="crypto-percentage-change"><i style="color: green; transform: rotate(-45deg);" class="fas fa-arrow-right"></i> +(' + Math.ceil(a) + "%)</span>";
        a < 0 && (a *= -1, n = '<span style="color: red;" class="crypto-percentage-change"><i style="color: red; transform: rotate(125deg);" class="fas fa-arrow-right"></i> -(' + Math.ceil(a) + "%)</span>");
        var o = '<div class="cryptotab-course-block"><i class="fas fa-exchange-alt"></i><span class="cryptotab-course-block-title">Koers verandering</span><span class="cryptotab-course-block-happening"><span style="font-size: 1.3vh;">€' + e.PreviousWorth + '</span> naar <span style="font-size: 1.3vh;">€' + e.NewWorth + "</span>" + n + "</span></div>";
        $(".cryptotab-course-list").append(o)
    })), $(".crypto-portofolio").find("p").html(CryptoData.Portfolio), $(".crypto-course").find("p").html("€" + CryptoData.Worth), $(".crypto-volume").find("p").html("€" + Math.ceil(CryptoData.Portfolio * CryptoData.Worth))
}

function UpdateCryptoData(t) {
    CryptoData.History = t.History, CryptoData.Portfolio = t.Portfolio.toFixed(6), CryptoData.Worth = t.Worth, CryptoData.WalletId = t.WalletId, $(".crypto-action-page-wallet").html("Portefeuille: " + CryptoData.Portfolio + " Qbit('s)"), $(".crypto-walletid").html(CryptoData.WalletId), $(".cryptotab-course-list").html(""), CryptoData.History.length > 0 && (CryptoData.History = CryptoData.History.reverse(), $.each(CryptoData.History, function(t, e) {
        var a = (e.NewWorth - e.PreviousWorth) / e.PreviousWorth * 100,
            n = '<span style="color: green;" class="crypto-percentage-change"><i style="color: green; transform: rotate(-45deg);" class="fas fa-arrow-right"></i> +(' + Math.ceil(a) + "%)</span>";
        a < 0 && (a *= -1, n = '<span style="color: red;" class="crypto-percentage-change"><i style="color: red; transform: rotate(125deg);" class="fas fa-arrow-right"></i> -(' + Math.ceil(a) + "%)</span>");
        var o = '<div class="cryptotab-course-block"><i class="fas fa-exchange-alt"></i><span class="cryptotab-course-block-title">Koers verandering</span><span class="cryptotab-course-block-happening"><span style="font-size: 1.3vh;">€' + e.PreviousWorth + '</span> naar <span style="font-size: 1.3vh;">€' + e.NewWorth + "</span>" + n + "</span></div>";
        $(".cryptotab-course-list").append(o)
    })), $(".crypto-portofolio").find("p").html(CryptoData.Portfolio), $(".crypto-course").find("p").html("€" + CryptoData.Worth), $(".crypto-volume").find("p").html("€" + Math.ceil(CryptoData.Portfolio * CryptoData.Worth))
}

function RefreshCryptoTransactions(t) {
    $(".cryptotab-transactions-list").html(""), t.CryptoTransactions.length > 0 && (t.CryptoTransactions = t.CryptoTransactions.reverse(), $.each(t.CryptoTransactions, function(t, e) {
        var a = "<span style='color: green;'>" + e.TransactionTitle + "</span>";
        "Afschrijving" == e.TransactionTitle && (a = "<span style='color: red;'>" + e.TransactionTitle + "</span>");
        var n = '<div class="cryptotab-transactions-block"> <i class="fas fa-exchange-alt"></i> <span class="cryptotab-transactions-block-title">' + a + '</span> <span class="cryptotab-transactions-block-happening">' + e.TransactionMessage + "</span></div>";
        $(".cryptotab-transactions-list").append(n)
    }))
}

function CloseCryptoPage() {
    $(".crypto-action-page").animate({
        left: "-30vh"
    }, 300, function() {
        $(".crypto-action-page-" + ActionTab).css({
            display: "none"
        }), $(".crypto-action-page").css({
            display: "none"
        }), ActionTab = null
    }), S4.Phone.Functions.HeaderTextColor("white", 300)
}

function buybm(t, e, a) {
    $("#blackmarket-" + e).css("display", "none"), $.post("http://s4-phone/buybm", JSON.stringify({
        x: t,
        price: a
    })), S4.Phone.Notifications.Add("fas fa-skull-crossbones", "Darkweb", "İşleme alındı.")
}

function setwp(t, e) {
    S4.Phone.Notifications.Add("fas fa-check-circle", "EMS", " Konum işaretlendi."), $.post("http://s4-phone/setwp", JSON.stringify({
        x: t,
        y: e
    }))
}

function goster(t) {
    simdiki_id = t, document.getElementById("photoShow").style.right = "0%", document.getElementById("imgS").style.background = document.getElementById("p_" + t).style.background, document.getElementById("imgS").style.backgroundSize = document.getElementById("p_" + t).style.backgroundSize, document.getElementById("imgS").style.backgroundPosition = document.getElementById("p_" + t).style.backgroundPosition
}

function kapat2() {
    document.getElementById("photoShow").style.right = "-120%"
}

function sil() {
    $("#g_" + simdiki_id).remove(), $.post("http://s4-phone/ResimSil", JSON.stringify({
        resim_url: simdiki_id
    })), S4.Phone.Notifications.Add("fas fa-check-circle", "Galeri", " Fotoğraf Silindi."), kapat2()
}
CryptoData.Portfolio = 0, CryptoData.Worth = 1e3, CryptoData.WalletId = null, CryptoData.History = [], $(document).on("click", ".crypto-header-footer-item", function(t) {
    t.preventDefault();
    var e = $(".crypto-header-footer").find('[data-cryptotab="' + SelectedCryptoTab + '"]'),
        a = $(this).data("cryptotab");
    a !== SelectedCryptoTab && ($(e).removeClass("crypto-header-footer-item-selected"), $(this).addClass("crypto-header-footer-item-selected"), $(".cryptotab-" + SelectedCryptoTab).css({
        display: "none"
    }), $(".cryptotab-" + a).css({
        display: "block"
    }), SelectedCryptoTab = $(this).data("cryptotab"))
}), $(document).on("click", ".cryptotab-general-action", function(t) {
    t.preventDefault();
    var e = $(this).data("action");
    $(".crypto-action-page").css({
        display: "block"
    }), $(".crypto-action-page").animate({
        left: 0
    }, 300), $(".crypto-action-page-" + e).css({
        display: "block"
    }), S4.Phone.Functions.HeaderTextColor("black", 300), ActionTab = e
}), $(document).on("click", "#cancel-crypto", function(t) {
    t.preventDefault(), $(".crypto-action-page").animate({
        left: "-30vh"
    }, 300, function() {
        $(".crypto-action-page-" + ActionTab).css({
            display: "none"
        }), $(".crypto-action-page").css({
            display: "none"
        }), ActionTab = null
    }), S4.Phone.Functions.HeaderTextColor("white", 300)
}), $(document).on("click", "#buy-crypto", function(t) {
    t.preventDefault();
    var e = $(".crypto-action-page-buy-crypto-input-coins").val(),
        a = $(".crypto-action-page-buy-crypto-input-money").val();
    "" !== e && "" !== a ? S4.Phone.Data.PlayerData.money.bank >= a ? $.post("http://qb-phone_limited_edition/BuyCrypto", JSON.stringify({
        Coins: e,
        Price: a
    }), function(t) {
        !1 !== t ? (UpdateCryptoData(t), CloseCryptoPage(), S4.Phone.Data.PlayerData.money.bank = parseInt(S4.Phone.Data.PlayerData.money.bank) - parseInt(a), S4.Phone.Notifications.Add("fas fa-university", "bank", "Er is &euro; " + a + ",- afgeschreven!", "#badc58", 2500)) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg geld..", "#badc58", 1500)
    }) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg geld..", "#badc58", 1500) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Vul alles in!", "#badc58", 1500)
}), $(document).on("click", "#sell-crypto", function(t) {
    t.preventDefault();
    var e = $(".crypto-action-page-sell-crypto-input-coins").val(),
        a = $(".crypto-action-page-sell-crypto-input-money").val();
    "" !== e && "" !== a ? CryptoData.Portfolio >= parseInt(e) ? $.post("http://qb-phone_limited_edition/SellCrypto", JSON.stringify({
        Coins: e,
        Price: a
    }), function(t) {
        !1 !== t ? (UpdateCryptoData(t), CloseCryptoPage(), S4.Phone.Data.PlayerData.money.bank = parseInt(S4.Phone.Data.PlayerData.money.bank) + parseInt(a), S4.Phone.Notifications.Add("fas fa-university", "bank", "Er is &euro; " + a + ",- bijgeschreven!", "#badc58", 2500)) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg Qbits..", "#badc58", 1500)
    }) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg Qbits..", "#badc58", 1500) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Vul alles in!", "#badc58", 1500)
}), $(document).on("click", "#transfer-crypto", function(t) {
    t.preventDefault();
    var e = $(".crypto-action-page-transfer-crypto-input-coins").val(),
        a = $(".crypto-action-page-transfer-crypto-input-walletid").val();
    "" !== e && "" !== a ? CryptoData.Portfolio >= e ? a !== CryptoData.WalletId ? $.post("http://qb-phone_limited_edition/TransferCrypto", JSON.stringify({
        Coins: e,
        WalletId: a
    }), function(t) {
        "notenough" == t ? S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg Qbits..", "#badc58", 1500) : "notvalid" == t ? S4.Phone.Notifications.Add("fas fa-university", "Crypto", "Dit Wallet-ID bestaat niet!", "#badc58", 2500) : (UpdateCryptoData(t), CloseCryptoPage(), S4.Phone.Notifications.Add("fas fa-university", "Crypto", "Je hebt " + e + ",- overgemaakt naar " + a + "!", "#badc58", 2500))
    }) : S4.Phone.Notifications.Add("fas fa-university", "Crypto", "Je kan niet naar jezelf overmaken..", "#badc58", 2500) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Je hebt niet genoeg Qbits..", "#badc58", 1500) : S4.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "Vul alles in!", "#badc58", 1500)
}), $(".crypto-action-page-buy-crypto-input-money").keyup(function() {
    var t = this.value;
    $(".crypto-action-page-buy-crypto-input-coins").val((t / CryptoData.Worth).toFixed(6))
}), $(".crypto-action-page-buy-crypto-input-coins").keyup(function() {
    var t = this.value;
    $(".crypto-action-page-buy-crypto-input-money").val(Math.ceil(CryptoData.Worth * t))
}), $(".crypto-action-page-sell-crypto-input-money").keyup(function() {
    var t = this.value;
    $(".crypto-action-page-sell-crypto-input-coins").val((t / CryptoData.Worth).toFixed(6))
}), $(".crypto-action-page-sell-crypto-input-coins").keyup(function() {
    var t = this.value;
    $(".crypto-action-page-sell-crypto-input-money").val(Math.ceil(CryptoData.Worth * t))
}), SetupBM = function(t) {
    $(".blackmarket2-list").html(""), null != t && $.each(t, function(t, e) {
        var a = `<div onclick="buybm('${e.name}', '${t}', '${e.price}')" class="blackmarket-list" id="blackmarket-${t}">  <div class="blackmarket-list-fullname">${e.label} </div><div class="blackmarket-span" style="float:right;color:green"> ${e.price}$</div> </div>`;
        $(".blackmarket2-list").append(a)
    })
}, SetupDarkweb = function(t) {
    $(".darkweb2-list").html(""), $(".darkweb2-list").css({
        left: "30vh"
    }), $(".darkweb-header").css({
        display: "none"
    }), $(".darkweb-header").css({
        left: "30vh"
    }), AnimationDarkweb(), setTimeout(function() {
        if ($(".darkweb-header").animate({
                left: "0vh"
            }, 300).css({
                display: "block"
            }), t.length > 0) $.each(t, function(t, e) {
            var a = '<div class="darkweb-list" id="darkwebid-' + t + '"> <div class="darkweb-list-firstletter"><img src="img/darkweb/' + e.item + '.png"width="70vh" height="70vh" style="border-radius:50%"></div> <div class="darkweb-list-fullname">' + e.label + '</div> <div class="darkweb-list-price">$' + e.price + '</div> <input type="number" id = "darkweb' + t + '"class="darkweb-list-count" placeholder="0" required spellcheck="false"> <div class="darkweb-list-call"><i class="fas fa-shopping-cart"></i></div> </div>';
            e.id = t, $(".darkweb2-list").animate({
                left: "0vh"
            }, 300).append(a), $("#darkwebid-" + t).data("darkwebData", e)
        });
        else {
            $(".darkweb2-list").append('<div class="darkweb-list"><div class="no-darkweb">Satılan hiç bir ürün yok.</div></div>')
        }
    }, 2900)
}, AnimationDarkweb = function() {
    $(".darkweb-logo").css({
        left: "0vh"
    }), $("#darkweb-text").css({
        opacity: "0.0",
        left: "9vh"
    }), $(".darkweb-app-loading").css({
        display: "block",
        left: "0vh"
    }), setTimeout(function() {
        CurrentTab = "accounts", $(".darkweb-logo").animate({
            left: "-12vh"
        }, 500), setTimeout(function() {
            $("#darkweb-text").animate({
                opacity: 1,
                left: "14vh"
            })
        }, 100), setTimeout(function() {
            $(".darkweb-app-loaded").css({
                display: "block"
            }).animate({
                "padding-left": "0"
            }, 300), $(".darkweb-app-accounts").animate({
                left: "0vh"
            }, 300), $(".darkweb-app-loading").animate({
                left: "-30vh"
            }, 300, function() {
                $(".darkweb-app-loading").css({
                    display: "none"
                })
            })
        }, 1500)
    }, 500)
}, $(document).on("click", ".darkweb-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("darkwebData"),
        a = Number($("#darkweb" + e.id).val());
    "" != a && a > 0 ? $.post("http://s4-phone/DarkwebOrder", JSON.stringify({
        Item: e.item,
        Label: e.label,
        Price: e.price,
        Count: a
    }), function(t) {
        t ? S4.Phone.Notifications.Add("fas fa-skull-crossbones", "Darkweb", "Sipariş verildi.", "#27ae60") : S4.Phone.Notifications.Add("fas fa-skull-crossbones", "Darkweb", "Yeterli paraya sahip değilsin.")
    }) : S4.Phone.Notifications.Add("fas fa-skull-crossbones", "Darkweb", "Miktar girmediniz.")
}), SetupDoctor = function(t) {
    if ($(".doctor2-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="doctor-list" id="doctorid-' + t + '"> <div class="doctor-list-firstletter">' + e.firstname.charAt(0).toUpperCase() + '</div> <div class="doctor-list-fullname">' + e.firstname + " " + e.lastname + '</div> <div class="doctor-list-call"><i class="fas fa-phone"></i></div> </div>';
        $(".doctor2-list").append(a), $("#doctorid-" + t).data("doctorData", e)
    });
    else {
        $(".doctor2-list").append('<div class="doctor-list"><div class="no-doctor">Müsait bir doktor bulunamadı...</div></div>')
    }
}, $(document).on("click", ".doctor-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("doctorData"),
        a = {
            number: e.phone,
            name: e.name
        };
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: a,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".doctor-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
}), SetupFood = function(t) {
    if ($(".food2-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="food-list" id="foodid-' + t + '"> <div class="food-list-firstletter"><img src="img/' + e.setjob + '.png"width="50vh" height="50vh" style="border-radius:50%"></div> <div class="food-list-fullname">' + e.name + '</div> <div class="food-list-company"><i class="fas fa-arrow-circle-right"></i></div> </div>';
        $(".food2-list").append(a), $("#foodid-" + t).data("foodData", e)
    });
    else {
        $(".food2-list").append('<div class="food-list"><div class="no-food">Şuanda müsait restorant yok..</div></div> <div class="food-list-back"><i class="fas fa-arrow-circle-left"></i></div> </div>')
    }
}, $(document).on("click", ".food-list-back", function(t) {
    $.post("http://s4-phone/GetCurrentFoodCompany", JSON.stringify({}), function(t) {
        SetupFood(t)
    })
}), $(document).on("click", ".food-list-company", function(t) {
    var e = $(this).parent().data("foodData");
    $.post("http://s4-phone/GetCurrentFoodWorker", JSON.stringify({
        FoodJob: e.setjob
    }), function(t) {
        if ($(".food2-list").html(""), t.length > 0) {
            $.each(t, function(t, e) {
                var a = '<div class="food-list" id="foodid-' + t + '"> <div class="food-list-firstletter-worker">' + e.name.charAt(0).toUpperCase() + '</div><div class="food-list-fullname">' + e.name + '</div> <div class="food-list-call"><i class="fas fa-phone"></i></div> </div>';
                $(".food2-list").append(a), $("#foodid-" + t).data("foodData", e)
            });
            $(".food2-list").append('<div class="food-list-back"><i class="fas fa-arrow-circle-left"></i></div> </div>')
        } else {
            $(".food2-list").append('<div class="food-list"><div class="no-food">Bu restoran şu anda hizmet vermiyor...</div></div> <div class="food-list-back"><i class="fas fa-arrow-circle-left"></i></div> </div>')
        }
    })
}), $(document).on("click", ".food-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("foodData"),
        a = {
            number: e.phone,
            name: e.name
        };
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: a,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".food-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
}), SetupEMS = function(t) {
    $("#emslist").html(""), null != t && (t = t.reverse(), $.each(t, function(t, e) {
        var a = "";
        0 == t && (a = 'style="border: 1px solid red;"');
        var n = `<div class="ems-s" ${a} onclick="setwp('${e.x}', '${e.y}')">\n\t  <span class="ems-img" style="\tbackground: url(img/apps/emss.png);  background-size: cover;"></span>\n      <span class="ems-name">YARDIM TALEBİ </span>\n\t </div>`;
        $("#emslist").append(n)
    }))
}, ResimleriGetir = function(t) {
    $(".grid2-container").html(""), null != t && $.each(t, function(t, e) {
        var a = `<div class="grid2-item" id="g_${e.id}"  style="margin-left: 1px;"><a href="javascript:goster('${e.id}');"><div id="p_${e.id}" style="background:url(${e.resim});     background-size: cover;background-position: 20%;" class="img" ></div></a></div>`;
        $(".grid2-container").append(a)
    })
}, $(document).on("click", ".garage-vehicle", function(t) {
    t.preventDefault(), $(".garage-homescreen").animate({
        left: "30vh"
    }, 200), $(".garage-detailscreen").animate({
        left: "0vh"
    }, 200);
    var e = $(this).attr("id"),
        a = $("#" + e).data("VehicleData");
    SetupDetails(a)
}), $(document).on("click", ".garage-cardetails-footer", function(t) {
    t.preventDefault(), $(".garage-homescreen").animate({
        left: "0vh"
    }, 200), $(".garage-detailscreen").animate({
        left: "-30vh"
    }, 200)
}), SetupGarageVehicles = function(t) {
    $(".garage-vehicles").html(""), null != t && $.each(t, function(t, e) {
        var a = '<div class="garage-vehicle" id="vehicle-' + t + '"> <span class="garage-vehicle-firstletter"></span> <span class="garage-vehicle-name">' + e.fullname + "</span> </div>";
        $(".garage-vehicles").append(a), $("#vehicle-" + t).data("VehicleData", e)
    })
};
var sonArac = null,
    sonCagirilan = null;

function HavaDurumuPozisyonCek(t) {
    var e = {};
    return "RAIN" == t ? (e.pos = "no-repeat -1130px -44px", e.width = "67px", e.height = "65px") : "THUNDER" == t ? (e.pos = "no-repeat -372px -44px", e.width = "67px", e.height = "59px") : "CLEARING" == t ? (e.pos = "no-repeat -1132px -208px", e.width = "63px", e.height = "41px") : "CLEAR" == t ? (e.pos = "no-repeat -222px -504px", e.width = "63px", e.height = "41px") : "EXTRASUNNY" == t ? (e.pos = "no-repeat -688px -358px", e.width = "41px", e.height = "41px") : "CLOUDS" == t ? (e.pos = " no-repeat -825px -508px", e.width = "70px", e.height = "40px") : "OVERCAST" == t ? (e.pos = "no-repeat -1130px -507px", e.width = "67px", e.height = "66px") : "SMOG" == t ? (e.pos = "no-repeat -220px -205px", e.width = "67px", e.height = "45px") : "FOGGY" == t ? (e.pos = "no-repeat -383px -360px", e.width = "43px", e.height = "43px") : "XMAS" == t ? (e.pos = "no-repeat -1282px -199px", e.width = "67px", e.height = "73px") : "SNOWLIGHT" == t ? (e.pos = "no-repeat -1130px -507px", e.width = "67px", e.height = "66px") : "BLIZZARD" == t ? (e.pos = "no-repeat -220px -356px", e.width = "67px", e.height = "63px") : (e.pos = "no-repeat -675px -206px", e.width = "67px", e.height = "37px"), e
}

function HavaDurumuCevirisi(t) {
    return t = "RAIN" == t ? "Yağmurlu" : "THUNDER" == t ? "Sağanak Yağışlı" : "CLEARING" == t ? "Parçalı Bulutlu" : "CLEAR" == t ? "Az Bulutlu" : "EXTRASUNNY" == t ? "Açık" : "CLOUDS" == t ? "Çok Bulutlu" : "OVERCAST" == t ? "Çok Bulutlu" : "SMOG" == t ? "Dumanlı" : "FOGGY" == t ? "Sisli" : "XMAS" == t ? "XMAS" : "SNOWLIGHT" == t ? "Kar Yağışlı" : "BLIZZARD" == t ? "Kar fırtınası" : "BILINMIYOR" == t ? "Bilinmiyor" : "N/A Bilinmiyor"
}
SetupDetails = function(t) {
    $(".vehicle-brand").find(".vehicle-answer").html(t.fullname), $(".vehicle-model").find(".vehicle-answer").html(t.model), $(".vehicle-plate").find(".vehicle-answer").html(t.plate), $(".vehicle-garage").find(".vehicle-answer").html(t.garage), $(".vehicle-status").find(".vehicle-answer").html(t.state), $(".vehicle-fuel").find(".vehicle-answer").html(Math.ceil(t.fuel) + "%"), $(".vehicle-engine").find(".vehicle-answer").html(Math.ceil(t.engine / 10) + "%"), $(".vehicle-body").find(".vehicle-answer").html(Math.ceil(t.body / 10) + "%"), t.plate == sonCagirilan ? $(".garage-vale-footer").css("display", "none") : $(".garage-vale-footer").css("display", "unset"), sonArac = t.plate
}, $(document).on("click", ".garage-vale-footer", function(t) {
    t.preventDefault(), sonCagirilan = sonArac, $.post("http://s4-phone/ValeCagir", JSON.stringify({
        plaka: sonCagirilan
    })), $(".garage-homescreen").animate({
        left: "0vh"
    }, 200), $(".garage-detailscreen").animate({
        left: "-30vh"
    }, 200)
}), S4.Phone.Functions.DoHavaDurumuOpen = function(t) {
    var e = t.simdikizaman,
        a = t.birsonraki;
    $(".drm").val(HavaDurumuCevirisi(e)), $(".drm2").val(HavaDurumuCevirisi(a)), t.derece = Math.round(t.derece), $(".los_santos").html("Los santos " + t.derece + "°"), $(".derece").html(t.derece + "°");
    var n = HavaDurumuPozisyonCek(e),
        o = HavaDurumuPozisyonCek(a);
    $(".havadurumu-durum").css({
        background: "url(../html/img/app_details/weather-icons.png) " + n.pos + " ",
        width: n.width,
        height: n.height
    }), $(".havadurumu-durum2").css({
        background: "url(../html/img/app_details/weather-icons.png) " + o.pos + " ",
        width: o.width,
        height: o.height
    })
};
var SelectedHousesTab = "myhouses",
    CurrentHouseData = {},
    HousesData = {};

function SetupPlayerHouses(t) {
    HousesData = t, $(".house-app-myhouses-container").html(""), t.length > 0 && $.each(t, function(t, e) {
        var a = 0;
        void 0 !== e.keyholders && null !== e.keyholders && (a = e.keyholders.length);
        var n = '<i class="fas fa-key"></i>&nbsp;&nbsp;' + a + '&nbsp&nbsp&nbsp&nbsp<i class="fas fa-warehouse"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-times"></i>';
        e.garage.length > 0 && (n = '<i class="fas fa-key"></i>&nbsp;&nbsp;' + a + '&nbsp&nbsp&nbsp&nbsp<i class="fas fa-warehouse"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-check"></i>');
        var o = '<div class="myhouses-house" id="house-' + t + '"><div class="myhouse-house-icon"><i class="fas fa-home"></i></div> <div class="myhouse-house-titel">' + e.label + " | Tier " + e.tier + '</div> <div class="myhouse-house-details">' + n + "</div> </div>";
        $(".house-app-myhouses-container").append(o), $("#house-" + t).data("HouseData", e)
    })
}
$(document).on("click", ".houses-app-header-tab", function(t) {
    t.preventDefault();
    var e = $("[data-housetab='" + SelectedHousesTab + "']"),
        a = $(this).data("housetab");
    a !== SelectedHousesTab && ($(".house-app-" + $(e).data("housetab") + "-container").css("display", "none"), $(".house-app-" + a + "-container").css("display", "block"), $(e).removeClass("houses-app-header-tab-selected"), $("[data-housetab='" + a + "']").addClass("houses-app-header-tab-selected"), SelectedHousesTab = a)
}), $(document).on("click", ".myhouses-house", function(t) {
    t.preventDefault();
    var e = $(this).data("HouseData");
    CurrentHouseData = e, $(".myhouses-options-container").fadeIn(150), $(".myhouses-options-header").html(e.label)
}), $(document).on("click", "#myhouse-option-close", function(t) {
    t.preventDefault(), $(".myhouses-options-container").fadeOut(150)
});
var AnimationDuration = 200;

function getirResim(t) {
    void 0 === t ? (S4.Phone.Notifications.Add("fas fa-check-circle", "Instagram uygulaması yanıt vermiyor.", "Telefonunuzu yeniden başlatmayı deneyin."), uygulama_kapat()) : "undefined" == t ? (S4.Phone.Notifications.Add("fas fa-check-circle", "Instagram uygulaması yanıt vermiyor.", "Telefonunuzu yeniden başlatmayı deneyin."), uygulama_kapat()) : ($.post("http://s4-phone/GetirinstaProfilBilgi", JSON.stringify({
        owner: t
    }), function(t) {
        $("#insta-kadi").val(t.username), null != t.biyografi && "" != t.biyografi ? ($("#insta-biyo").val(t.biyografi), $("#insta-biyo2").val(t.biyografi)) : ($("#insta-biyo").val("Biyografi yok!"), $("#insta-biyo2").val("Biyografi yok!")), "default" == t.profilepicture ? $("#insta-profil-fotosu").attr("src", "./img/default.png") : $("#insta-profil-fotosu").attr("src", t.profilepicture)
    }), $.post("http://s4-phone/GetirinstaResimleri", JSON.stringify({
        owner: t
    }), function(t) {
        ResimleriGetirinsta(t)
    }), $("#insta-profil").css("display", "block"))
}

function takipet(t, e) {
    $("#takip_" + e).css("display", "none"), $("#takipcik_" + e).css("display", "block"), $.post("http://s4-phone/Takip_instagram", JSON.stringify({
        takip: "1",
        takip_edilen: t
    }))
}

function guncelleinsta() {
    S4.Phone.Notifications.Add("fas fa-check-circle", "Instagram", "Biyografi güncellendi."), $.post("http://s4-phone/biyoguncelle", JSON.stringify({
        biyografi: $("#insta-biyo2").val()
    }))
}

function taktencikar(t, e) {
    $("#takip_" + e).css("display", "block"), $("#takipcik_" + e).css("display", "none"), $.post("http://s4-phone/Takip_instagram", JSON.stringify({
        takip: "0",
        takip_edilen: t
    }))
}

function Panelinsta(t) {
    $("#insta-aktivite").css("display", "none"), $("#insta-profil").css("display", "none"), $("#insta-paylas").css("display", "none"), $("#insta-paylas2").css("display", "none"), $("#insta-paylas3").css("display", "none"), $("#insta-timeline").css("display", "none"), $("#insta-ara").css("display", "none"), $("#insta-ayar").css("display", "none"), $("#insta-" + t).css("display", "block")
}

function like(t) {
    $("#like_" + t).css("background", "url(../html/img/app_details/instagram_icons2.png) no-repeat -950px -947px"), $("#like_" + t).attr("href", "javascript:unlike('" + t + "')")
}

function unlike(t) {
    $("#like_" + t).css("background", "url(../html/img/app_details/instagram_icons2.png) no-repeat -900px -947px"), $("#like_" + t).attr("href", "javascript:like('" + t + "')")
}
$(document).on("click", "#myhouse-option-transfer", function(t) {
    t.preventDefault(), $(".myhouses-options").animate({
        left: "-35vw"
    }, AnimationDuration), $(".myhouse-option-transfer-container").animate({
        left: 0
    }, AnimationDuration)
}), $(document).on("click", "#myhouse-option-keys", function(t) {
    void 0 !== CurrentHouseData.keyholders && null !== CurrentHouseData.keyholders && $.each(CurrentHouseData.keyholders, function(t, e) {
        var a;
        null != e && (a = e.charinfo.firstname !== QB.Phone.Data.PlayerData.charinfo.firstname && e.charinfo.lastname !== QB.Phone.Data.PlayerData.charinfo.lastname ? '<div class="house-key" id="holder-' + t + '"><span class="house-key-holder">' + e.charinfo.firstname + " " + e.charinfo.lastname + '</span> <div class="house-key-delete"><i class="fas fa-trash"></i></div> </div>' : '<div class="house-key" id="holder-' + t + '"><span class="house-key-holder">(Ik) ' + e.charinfo.firstname + " " + e.charinfo.lastname + "</span></div>", $(".keys-container").append(a), $("#holder-" + t).data("KeyholderData", e))
    }), $(".myhouses-options").animate({
        left: "-35vw"
    }, AnimationDuration), $(".myhouse-option-keys-container").animate({
        left: 0
    }, AnimationDuration)
}), $(document).on("click", ".house-key-delete", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("KeyholderData");
    $.each(CurrentHouseData.keyholders, function(t, a) {
        e.citizenid == a.citizenid && CurrentHouseData.keyholders.splice(t)
    }), $.each(HousesData, function(t, e) {
        e.name == CurrentHouseData.name && (HousesData[t].keyholders = CurrentHouseData.keyholders)
    }), SetupPlayerHouses(HousesData), $(this).parent().fadeOut(250, function() {
        $(this).remove()
    }), $.post("http://coderc-phone/RemoveKeyholder", JSON.stringify({
        HolderData: e,
        HouseData: CurrentHouseData
    }))
}), $(document).on("click", "#myhouse-option-transfer-confirm", function(t) {
    t.preventDefault(), $(".myhouses-options").animate({
        left: 0
    }, AnimationDuration), $(".myhouse-option-transfer-container").animate({
        left: "35vw"
    }, AnimationDuration)
}), $(document).on("click", "#myhouse-option-transfer-back", function(t) {
    t.preventDefault(), $(".myhouses-options").animate({
        left: 0
    }, AnimationDuration), $(".myhouse-option-transfer-container").animate({
        left: "35vw"
    }, AnimationDuration)
}), $(document).on("click", "#myhouse-option-keys-back", function(t) {
    t.preventDefault(), $(".myhouses-options").animate({
        left: 0
    }, AnimationDuration), $(".myhouse-option-keys-container").animate({
        left: "35vw"
    }, AnimationDuration)
}), ListeleHesaplar = function(t) {
    $("#myTable").html('\n\t\n\t<tr class="header" style="display:none;">\n    <th style="width:60%;">&nbsp;</th>\n    <th style="width:40%;">&nbsp;</th>\n  </tr>\n\t\n\t'), null != t && $.each(t, function(t, e) {
        var a = `\n\t<a id="takip_${t}" href="javascript:takipet('${e.identifier}', '${t}')" class="takipbtn">Takip et!</a>\n\t<a id="takipcik_${t}" href="javascript:taktencikar('${e.identifier}', '${t}')" style="display:none;" class="takipcikbtn">Takibi bırak</a>\n\t\n\t`;
        null != e.takip && (a = `\n\t<a id="takip_${t}" href="javascript:takipet('${e.identifier}', '${t}')" style="display:none;" class="takipbtn">Takip et!</a>\n\t<a id="takipcik_${t}" href="javascript:taktencikar('${e.identifier}', '${t}')"  class="takipcikbtn">Takibi bırak</a>\n\t\n\t`);
        var n = `\n\t\t \n   <tr>\n    <td>${e.username}</td>\n\t\t<td>${a}</td>\n  </tr>\n\n\t\t\t\n\t\t\t`;
        e.identifier != S4.Phone.Data.PlayerData.identifier && $("#myTable").append(n)
    })
}, ResimleriGetirinsta = function(t) {
    $(".gridinsta-container").html(""), $("#aktiviteyok").css("display", "unset"), null != t && $.each(t, function(t, e) {
        $("#aktiviteyok").css("display", "none");
        var a = `\n\t\t\t<div class="gridinsta-item" id="g_${e.id}"  style="margin-left: 1px;">\n\t\t\t<input type="text" id="owner_${e.id}" value="${e.owner}" style="display:none;" />\n\t\t\t<a href="javascript:gosterinsta('${e.id}');"><div id="p_${e.id}" style="background:url(${e.resim});     filter:${e.efekt};    background-size: cover;background-position: 20%;" class="img" ></div>\n\t\t\t</a></div>`;
        $(".gridinsta-container").append(a)
    })
}, Galerinsta = function(t) {
    $(".gridinsta2-container").html(""), null != t && $.each(t, function(t, e) {
        var a = `\n\t\t\t<div class="gridinsta2-item" id="gx_${e.id}"  style="margin-left: 1px;">\n \n\t\t\t<a href="javascript:secinsta('${e.id}');"><div id="px_${e.id}" style="background:url(${e.resim});     background-size: cover;background-position: 20%;" class="img" ></div>\n\t\t\t</a></div>`;
        $(".gridinsta2-container").append(a)
    })
}, Getirinstazamantuneli = function(t) {
    $("#insta-timeline").html(""), null != t && $.each(t, function(t, e) {
        null == e.profilepicture && (e.profilepicture = "./img/default.png"), "undefined" == e.profilepicture && (e.profilepicture = "./img/default.png"), "default" == e.profilepicture && (e.profilepicture = "./img/default.png");
        var a = `\n\t\t \n<div class="insta-post">\n<a href="javascript:getirResim('${e.owner}')" style="color: black;" >\n<table style="width:100%">\n  <tr>\n    <th><div class="insta-profil-img"style="    background: url(${e.profilepicture});\n    background-size: cover; " ></div></th>\n    <th><input type="text" class="post2" value="${e.username}" disabled /></th>\n   \n  </tr>\n  </table>\n\n</a>\n<div class="insta-post-img" style="    background: url(${e.resim});\n    background-size: cover;  filter: ${e.efekt}; " ></div>\n<a class="i i-kalp" id="like_${e.id}" href="javascript:like('${e.id}');" style="margin-left:30px; background: url(../html/img/app_details/instagram_icons2.png) no-repeat -900px -947px;" ></a>\n<input type="text"  value="${e.yazi}" disabled />\n</div>\n\n\n\t\t\t`;
        $("#insta-timeline").append(a)
    })
};
var instasimdiki_id = null,
    eskiEfekt = null,
    eskiResim = null;

function efekt(t) {
    eskiEfekt != t ? document.getElementById("secilen_foto").style.filter = t : (Panelinsta("paylas3"), document.getElementById("secilen_foto2").style.background = document.getElementById("px_" + eskiResim).style.background, document.getElementById("secilen_foto2").style.backgroundSize = document.getElementById("px_" + eskiResim).style.backgroundSize, document.getElementById("secilen_foto2").style.backgroundPosition = document.getElementById("px_" + eskiResim).style.backgroundPosition, document.getElementById("secilen_foto2").style.filter = eskiEfekt), eskiEfekt = t
}

function paylasinsta() {
    Panelinsta("paylas"), S4.Phone.Notifications.Add("fas fa-check-circle", "Instagram", "Bir fotoğraf paylaşıldı."), $.post("http://s4-phone/PaylasInstaPost", JSON.stringify({
        eskiResim: eskiResim,
        eskiEfekt: eskiEfekt,
        yazi: $("#paylastext").val()
    }))
}

function gosterinsta(t) {
    instasimdiki_id = t, document.getElementById("photoShowinsta").style.right = "0%", document.getElementById("imgSinsta").style.background = document.getElementById("p_" + t).style.background, document.getElementById("imgSinsta").style.backgroundSize = document.getElementById("p_" + t).style.backgroundSize, document.getElementById("imgSinsta").style.backgroundPosition = document.getElementById("p_" + t).style.backgroundPosition, document.getElementById("imgSinsta").style.filter = document.getElementById("p_" + t).style.filter, S4.Phone.Data.PlayerData.identifier == $("#owner_" + t).val() ? $("#silinsta").css("display", "unset") : $("#silinsta").css("display", "none")
}

function secinsta(t) {
    var e;
    for ($("#insta-paylas").css("display", "none"), $("#insta-paylas2").css("display", "block"), document.getElementById("secilen_foto").style.background = document.getElementById("px_" + t).style.background, document.getElementById("secilen_foto").style.backgroundSize = document.getElementById("px_" + t).style.backgroundSize, document.getElementById("secilen_foto").style.backgroundPosition = document.getElementById("px_" + t).style.backgroundPosition, eskiResim = t, e = 1; e < 9; e++) document.getElementById("e" + e).style.background = document.getElementById("px_" + t).style.background, document.getElementById("e" + e).style.backgroundSize = "cover", document.getElementById("e" + e).style.backgroundPosition = "center"
}

function kapat2insta() {
    document.getElementById("photoShowinsta").style.right = "-120%"
}

function silinsta() {
    $("#g_" + instasimdiki_id).remove(), $.post("http://s4-phone/ResimSilinsta", JSON.stringify({
        resim_url: instasimdiki_id
    })), S4.Phone.Notifications.Add("fas fa-check-circle", "Instagram", "Paylaşım Silindi."), kapat2insta()
}
SetupLawyers = function(t) {
    if ($(".lawyers-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="lawyer-list" id="lawyerid-' + t + '"> <div class="lawyer-list-firstletter">' + e.firstname.charAt(0).toUpperCase() + '</div> <div class="lawyer-list-fullname">' + e.firstname + " " + e.lastname + '</div> <div class="lawyer-list-call"><i class="fas fa-phone"></i></div> </div>';
        $(".lawyers-list").append(a), $("#lawyerid-" + t).data("LawyerData", e)
    });
    else {
        $(".lawyers-list").append('<div class="lawyer-list"><div class="no-lawyers">Şuada müsait avukat bulunmuyor.</div></div>')
    }
}, $(document).on("click", ".lawyer-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("LawyerData"),
        a = {
            number: e.phone,
            name: e.name
        };
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: a,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".lawyers-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
});
var OpenedMail = null;
$(document).on("click", ".mail", function(t) {
    t.preventDefault(), $(".mail-home").animate({
        left: "30vh"
    }, 300), $(".opened-mail").animate({
        left: "0vh"
    }, 300);
    var e = $("#" + $(this).attr("id")).data("MailData");
    S4.Phone.Functions.SetupMail(e), OpenedMail = $(this).attr("id")
}), $(document).on("click", ".mail-back", function(t) {
    t.preventDefault(), $(".mail-home").animate({
        left: "0vh"
    }, 300), $(".opened-mail").animate({
        left: "-30vh"
    }, 300), OpenedMail = null
}), $(document).on("click", "#accept-mail", function(t) {
    t.preventDefault();
    var e = $("#" + OpenedMail).data("MailData");
    $.post("http://s4-phone/AcceptMailButton", JSON.stringify({
        buttonEvent: e.button.buttonEvent,
        buttonData: e.button.buttonData,
        mailId: e.mailid
    })), $(".mail-home").animate({
        left: "0vh"
    }, 300), $(".opened-mail").animate({
        left: "-30vh"
    }, 300)
}), $(document).on("click", "#remove-mail", function(t) {
    t.preventDefault();
    var e = $("#" + OpenedMail).data("MailData");
    $.post("http://s4-phone/RemoveMail", JSON.stringify({
        mailId: e.mailid
    })), $(".mail-home").animate({
        left: "0vh"
    }, 300), $(".opened-mail").animate({
        left: "-30vh"
    }, 300)
}), S4.Phone.Functions.SetupMails = function(t) {
    var e = new Date,
        a = e.getHours(),
        n = e.getMinutes(),
        o = a;
    a < 10 && (o = "0" + o);
    $("#mail-header-text").html(S4.Phone.Data.PlayerData.charinfo.firstname + "_" + S4.Phone.Data.PlayerData.charinfo.lastname), $("#mail-header-mail").html(S4.Phone.Data.PlayerData.charinfo.firstname + "_" + S4.Phone.Data.PlayerData.charinfo.lastname + "@gmail.com"), null != t && (t.length > 0 ? ($(".mail-list").html(""), $.each(t, function(t, e) {
        var a = new Date(e.date),
            n = a.getDay() + " " + MonthFormatting[a.getMonth()] + " " + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes(),
            o = '<div class="mail" id="mail-' + e.mailid + '"><span class="mail-sender" style="font-weight: bold;">' + e.sender + '</span> <div class="mail-text"><p>' + e.message + '</p></div> <div class="mail-time">' + n + "</div></div>";
        $(".mail-list").append(o), $("#mail-" + e.mailid).data("MailData", e)
    })) : $(".mail-list").html('<p class="nomails">Herhangi bir mail yok!</p>'))
};
var MonthFormatting = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
S4.Phone.Functions.SetupMail = function(t) {
    var e = new Date(t.date),
        a = e.getDay() + " " + MonthFormatting[e.getMonth()] + " " + e.getFullYear() + " " + e.getHours() + ":" + e.getMinutes();
    $(".mail-subject").html("<p><span style='font-weight: bold;'>" + t.sender + "</span><br>" + t.subject + "</p>"), $(".mail-date").html("<p>" + a + "</p>"), $(".mail-content").html("<p>" + t.message + "</p>"), $(".mail-image-media").html("<p style='font-weight: bold;'>Medya:</p>"), null != t.messageUrl && $(".mail-image").html("<img src=" + t.messageUrl + " width='240vh' height='200vh' style='border-radius: 1vh;' </img>");
    var n = '<div class="opened-mail-footer-item" id="remove-mail"><i class="fas fa-trash-alt mail-icon"></i></div>';
    $(".opened-mail-footer").html(""), void 0 !== t.button && null !== t.button ? ($(".opened-mail-footer").append('<div class="opened-mail-footer-item" id="accept-mail"><i class="fas fa-check-circle mail-icon"></i></div>'), $(".opened-mail-footer").append(n), $(".opened-mail-footer-item").css({
        width: "50%"
    })) : ($(".opened-mail-footer").append(n), $(".opened-mail-footer-item").css({
        width: "100%"
    }))
}, $(document).on("click", ".test-slet", function(t) {
    t.preventDefault(), $(".advert-home").animate({
        left: "30vh"
    }), $(".new-advert").animate({
        left: "0vh"
    })
}), $(document).on("click", "#new-advert-back", function(t) {
    t.preventDefault(), $(".advert-home").animate({
        left: "0vh"
    }), $(".new-advert").animate({
        left: "-30vh"
    })
});
var cekilmis_foto = null;

function fotosil() {
    cekilmis_foto = null, $(".foto_advert").css("display", "none"), $(".silgorsel").css("display", "none")
}
$(document).on("click", "#new-advert-submit", function(t) {
    t.preventDefault();
    var e = $(".new-advert-textarea").val();
    "" !== e ? ($(".advert-home").animate({
        left: "0vh"
    }), $(".new-advert").animate({
        left: "-30vh"
    }), $.post("http://s4-phone/PostAdvert", JSON.stringify({
        message: e,
        cekilmis_foto: cekilmis_foto
    })), setTimeout(function() {
        $(".new-advert-textarea").val(""), fotosil(), $.post("http://s4-phone/LoadAdverts", JSON.stringify({}), function(t) {
            S4.Phone.Functions.RefreshAdverts(t)
        })
    }, 500)) : S4.Phone.Notifications.Add("fas fa-ad", S4.Phone.Functions.Lang("ADVERTISEMENT_TITLE"), S4.Phone.Functions.Lang("ADVERTISEMENT_EMPY"), "#ff8f1a", 2e3)
}), $(document).on("click", "#new-advert-foto", function(t) {
    t.preventDefault(), $.post("http://s4-phone/PostNewImage", JSON.stringify({}), function(t) {
        $(".foto_advert").attr("src", t), $(".foto_advert").css("display", "block"), $(".silgorsel").css("display", "block"), cekilmis_foto = t
    }), S4.Phone.Functions.Close()
}), S4.Phone.Functions.RefreshAdverts = function(t) {
    $("#advert-header-name").html("@" + S4.Phone.Data.PlayerData.charinfo.firstname + "_" + S4.Phone.Data.PlayerData.charinfo.lastname + " | " + S4.Phone.Data.PlayerData.charinfo.phone), $(".advert-list").html(""), null != t && $.each(t, function(t, e) {
        var a = "";
        null != e.resim && (a = `<img src="${e.resim}" style="width: 175px; margin-bottom: 10px;" />`);
        var n = `\n\t\t\t<div class="advert">\n               <span class="advert-sender">${e.isim} | ${e.telno}</span>\n                <p>${e.mesaj}</p>\n\t\t\t\t${a}\n             </div>\n\t\t\t`;
        $(".advert-list").append(n)
    })
}, SetupMecano = function(t) {
    if ($(".mecano2-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="mecano-list" id="mecanoid-' + t + '"> <div class="mecano-list-firstletter">' + e.firstname.charAt(0).toUpperCase() + '</div> <div class="mecano-list-fullname">' + e.firstname + " " + e.lastname + '</div> <div class="mecano-list-call"><i class="fas fa-phone"></i></div> </div>';
        $(".mecano2-list").append(a), $("#mecanoid-" + t).data("mecanoData", e)
    });
    else {
        $(".mecano2-list").append('<div class="mecano-list"><div class="no-mecano">Şuanda müsait mekanik yok..</div></div>')
    }
}, $(document).on("click", ".mecano-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("mecanoData"),
        a = {
            number: e.phone,
            name: e.name
        };
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: a,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".mecano-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
});
var CurrentMeosPage = null,
    OpenedPerson = null;
$(document).on("click", ".meos-block", function(t) {
    t.preventDefault();
    var e = $(this).data("meosblock");
    OpenMeosPage(e)
}), OpenMeosPage = function(t) {
    CurrentMeosPage = t, $(".meos-" + CurrentMeosPage + "-page").css({
        display: "block"
    }), $(".meos-homescreen").animate({
        left: "30vh"
    }, 200), $(".meos-tabs").animate({
        left: "0vh"
    }, 200, function() {
        $(".meos-tabs-footer").animate({
            bottom: 0
        }, 200), "alerts" == CurrentMeosPage && ($(".meos-recent-alert").removeClass("noodknop"), $(".meos-recent-alert").css({
            "background-color": "#004682"
        }))
    })
}, SetupMeosHome = function() {
    $("#meos-app-name").html("Hosgeldin: " + S4.Phone.Data.PlayerData.charinfo.firstname + " " + S4.Phone.Data.PlayerData.charinfo.lastname)
}, MeosHomePage = function() {
    $(".meos-tabs-footer").animate({
        bottom: "-5vh"
    }, 200), setTimeout(function() {
        $(".meos-homescreen").animate({
            left: "0vh"
        }, 200, function() {
            "alerts" == CurrentMeosPage && $(".meos-alert-new").remove(), $(".meos-" + CurrentMeosPage + "-page").css({
                display: "none"
            }), CurrentMeosPage = null, $(".person-search-results").html(""), $(".vehicle-search-results").html("")
        }), $(".meos-tabs").animate({
            left: "-30vh"
        }, 200)
    }, 400)
}, $(document).on("click", ".meos-tabs-footer", function(t) {
    t.preventDefault(), MeosHomePage()
}), $(document).on("click", ".person-search-result", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("PersonData"),
        n = "Man";
    "f" == a.gender && (n = "Female");
    var o = "True";
    a.driverlicense || (o = "False");
    var i = "False";
    a.weaponlicense && (i = "True");
    var s = '<div class="person-search-result-name">Name: ' + a.firstname + " " + a.lastname + '</div> <div class="person-search-result-bsn">Phone: ' + a.phone + '</div> <div class="person-opensplit"></div> &nbsp; <div class="person-search-result-dob">Birthday: ' + a.birthdate + '</div> <div class="person-search-result-gender">Sex: ' + n + '</div> &nbsp; <div class="person-search-result-warned">Weapon License: ' + i + '</div> <div class="person-search-result-driverslicense">Drivers license: ' + o + "</div>";
    if (null === OpenedPerson) $(this).html(s), OpenedPerson = this;
    else if (OpenedPerson == this) {
        var c = $(OpenedPerson).attr("id"),
            l = '<div class="person-search-result-name">Name: ' + (r = $("#" + c).data("PersonData")).firstname + " " + r.lastname + '</div> <div class="person-search-result-bsn">Phone: ' + r.phone + "</div>";
        $(this).html(l), OpenedPerson = null
    } else {
        var r;
        c = $(OpenedPerson).attr("id"), l = '<div class="person-search-result-name">Name: ' + (r = $("#" + c).data("PersonData")).firstname + " " + r.lastname + '</div> <div class="person-search-result-bsn">Phone: ' + r.phone + "</div>";
        $(OpenedPerson).html(l), $(this).html(s), OpenedPerson = this
    }
});
var OpenedHouse = null;
$(document).on("click", ".house-adress-location", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("HouseData");
    $.post("http://s4-phone/SetGPSLocation", JSON.stringify({
        coords: a.coords
    }))
}), $(document).on("click", ".appartment-adress-location", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("PersonData");
    $.post("http://s4-phone/SetApartmentLocation", JSON.stringify({
        data: a
    }))
}), $(document).on("click", ".person-search-result-house", function(t) {
    t.preventDefault();
    var e = $(this).attr("id"),
        a = $("#" + e).data("HouseData");
    a.garage.length;
    var n = '<div class="person-search-result-name">Eigenaar: ' + a.charinfo.firstname + " " + a.charinfo.lastname + '</div><div class="person-search-result-bsn">Huis: ' + a.label + '</div> <div class="person-opensplit"></div> &nbsp; <div class="person-search-result-dob">Adres: ' + a.label + ' &nbsp; <i class="fas fa-map-marker-alt house-adress-location" id="' + e + '"></i></div> <div class="person-search-result-number">Tier: ' + a.tier + "</div>";
    if (null === OpenedHouse) $(this).html(n), OpenedHouse = this;
    else if (OpenedHouse == this) {
        var o = $(OpenedHouse).attr("id"),
            i = '<div class="person-search-result-name">Eigenaar: ' + (s = $("#" + o).data("HouseData")).charinfo.firstname + " " + s.charinfo.lastname + '</div> <div class="person-search-result-bsn">House: ' + s.label + "</div>";
        $(this).html(i), OpenedHouse = null
    } else {
        var s;
        o = $(OpenedHouse).attr("id"), i = '<div class="person-search-result-name">Eigenaar: ' + (s = $("#" + o).data("HouseData")).charinfo.firstname + " " + s.charinfo.lastname + '</div> <div class="person-search-result-bsn">House: ' + s.label + "</div>";
        $(OpenedHouse).html(i), $(this).html(n), OpenedHouse = this
    }
}), $(document).on("click", ".confirm-search-person-test", function(t) {
    t.preventDefault();
    var e = $(".person-search-input").val();
    "" !== e ? $.post("http://s4-phone/FetchSearchResults", JSON.stringify({
        input: e
    }), function(t) {
        null != t ? ($(".person-search-results").html(""), $.each(t, function(t, e) {
            var a = '<div class="person-search-result" id="person-' + t + '"><div class="person-search-result-name">Name: ' + e.firstname + " " + e.lastname + '</div> <div class="person-search-result-bsn">Phone: ' + e.phone + "</div> </div>";
            $(".person-search-results").append(a), $("#person-" + t).data("PersonData", e)
        })) : (S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_NORESULT")), $(".person-search-results").html(""))
    }) : (S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_NORESULT")), $(".person-search-results").html(""))
}), $(document).on("click", ".confirm-search-person-house", function(t) {
    t.preventDefault();
    var e = $(".person-search-input-house").val();
    "" !== e ? $.post("http://s4-phone/FetchPlayerHouses", JSON.stringify({
        input: e
    }), function(t) {
        null != t ? ($(".person-search-results").html(""), $.each(t, function(t, e) {
            var a = '<div class="person-search-result-house" id="personhouse-' + t + '"><div class="person-search-result-name">Eigenaar: ' + e.charinfo.firstname + " " + e.charinfo.lastname + '</div> <div class="person-search-result-bsn">Huis: ' + e.label + "</div></div>";
            $(".person-search-results").append(a), $("#personhouse-" + t).data("HouseData", e)
        })) : (S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_NORESULT")), $(".person-search-results").html(""))
    }) : (S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_NORESULT")), $(".person-search-results").html(""))
}), $(document).on("click", ".confirm-search-vehicle", function(t) {
    t.preventDefault();
    var e = $(".vehicle-search-input").val();
    "" !== e ? $.post("http://s4-phone/FetchVehicleResults", JSON.stringify({
        input: e
    }), function(t) {
        null != t && ($(".vehicle-search-results").html(""), $.each(t, function(t, e) {
            var a = "Ja";
            e.status || (a = "Nee");
            var n = "Nee";
            e.isFlagged && (n = "Ja");
            var o = '<div class="vehicle-search-result"> <div class="vehicle-search-result-name">' + e.label + '</div> <div class="vehicle-search-result-plate">Kenteken: ' + e.plate + '</div> <div class="vehicle-opensplit"></div> &nbsp; <div class="vehicle-search-result-owner">Eigenaar: ' + e.owner + '</div> &nbsp; <div class="vehicle-search-result-apk">APK: ' + a + '</div> <div class="vehicle-search-result-warrant">Gesignaleerd: ' + n + "</div> </div>";
            $(".vehicle-search-results").append(o)
        }))
    }) : (S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_NORESULT")), $(".vehicle-search-results").html(""))
}), $(document).on("click", ".scan-search-vehicle", function(t) {
    t.preventDefault(), $.post("http://s4-phone/FetchVehicleScan", JSON.stringify({}), function(t) {
        if (null != t) {
            $(".vehicle-search-results").html("");
            var e = "Ja";
            t.status || (e = "Nee");
            var a = "Nee";
            t.isFlagged && (a = "Ja");
            var n = '<div class="vehicle-search-result"> <div class="vehicle-search-result-name">' + t.label + '</div> <div class="vehicle-search-result-plate">Kenteken: ' + t.plate + '</div> <div class="vehicle-opensplit"></div> &nbsp; <div class="vehicle-search-result-owner">Eigenaar: ' + t.owner + '</div> &nbsp; <div class="vehicle-search-result-apk">APK: ' + e + '</div> <div class="vehicle-search-result-warrant">Gesignaleerd: ' + a + "</div> </div>";
            $(".vehicle-search-results").append(n)
        } else S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("NO_VEHICLE")), $(".vehicle-search-results").append("")
    })
}), AddPoliceAlert = function(t) {
    var e = Math.floor(1e4 * Math.random() + 1),
        a = "";
    a = null != t.alert.coords && null != t.alert.coords ? '<div class="meos-alert" id="alert-' + e + '"> <span class="meos-alert-new" style="margin-bottom: 1vh;">NIEUW</span> <p class="meos-alert-type">Melding: ' + t.alert.title + '</p> <p class="meos-alert-description">' + t.alert.description + '</p> <hr> <div class="meos-location-button">LOCATIE</div> </div>' : '<div class="meos-alert" id="alert-' + e + '"> <span class="meos-alert-new" style="margin-bottom: 1vh;">NIEUW</span> <p class="meos-alert-type">Melding: ' + t.alert.title + '</p> <p class="meos-alert-description">' + t.alert.description + "</p></div>", $(".meos-recent-alerts").html('<div class="meos-recent-alert" id="recent-alert-' + e + '"><span class="meos-recent-alert-title">Melding: ' + t.alert.title + '</span><p class="meos-recent-alert-description">' + t.alert.description + "</p></div>"), "Assistentie collega" == t.alert.title && ($(".meos-recent-alert").css({
        "background-color": "#d30404"
    }), $(".meos-recent-alert").addClass("noodknop")), $(".meos-alerts").prepend(a), $("#alert-" + e).data("alertData", t.alert), $("#recent-alert-" + e).data("alertData", t.alert)
}, $(document).on("click", ".meos-recent-alert", function(t) {
    t.preventDefault();
    var e = $(this).data("alertData");
    null != e.coords && null != e.coords ? $.post("http://s4-phone/SetAlertWaypoint", JSON.stringify({
        alert: e
    })) : S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_GPS"))
}), $(document).on("click", ".meos-location-button", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("alertData");
    $.post("http://s4-phone/SetAlertWaypoint", JSON.stringify({
        alert: e
    }))
}), $(document).on("click", ".meos-clear-alerts", function(t) {
    $(".meos-alerts").html(""), $(".meos-recent-alerts").html('<div class="meos-recent-alert"> <span class="meos-recent-alert-title">You have no notifications yet!</span></div>'), S4.Phone.Notifications.Add("politie", S4.Phone.Functions.Lang("MEOS_TITLE"), S4.Phone.Functions.Lang("MEOS_CLEARED"))
}), SetupNotlar = function(t) {
    $(".not_listesi").html(" "), $(".garage-vehicles").html(""), null != t && $.each(t, function(t, e) {
        var a = `\n\t\t\t\n\t\t\t\n\t\t\t\n<a href="javascript:notGoster('${e.id}');"><div class="nn">\n<p id="baslik_">${e.baslik}</p>\n<input type="text"  id="b_${e.id}" value="${e.baslik}" style="display:none;" />\n<input type="text"  id="t_${e.id}" value="${e.aciklama}" style="display:none;" />\n</div></a>\n \n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t`;
        $(".not_listesi").append(a)
    })
};
var guncelleme_id = null;

function notGoster(t) {
    guncelleme_id = t, document.getElementById("gnc_ttr").value = document.getElementById("b_" + t).value, document.getElementById("gnc_tarea").value = document.getElementById("t_" + t).value, $("#p").css("display", "none"), $(".n-p").css("display", "none"), $(".not_listesi").css("display", "none"), $(".gstr").css("display", "block")
}

function not(t) {
    1 == t ? ($("#p").css("display", "none"), $(".n-p").css("display", "block"), $(".gstr").css("display", "none"), $(".not_listesi").css("display", "none")) : ($("#p").css("display", "block"), $(".n-p").css("display", "none"), $(".gstr").css("display", "none"), $(".not_listesi").css("display", "block"), $.post("http://s4-phone/GetirNotlar", JSON.stringify({}), function(t) {
        SetupNotlar(t)
    })), document.getElementById("tarea").value = "Açıklama girin."
}

function kaydetNot() {
    var t = document.getElementById("ttr").value,
        e = document.getElementById("tarea").value;
    S4.Phone.Notifications.Add("fas fa-check-circle", "Notlar", t + " Adlı not kaydedildi."), $.post("http://s4-phone/NotEkle", JSON.stringify({
        baslik: t,
        aciklama: e
    })), not(0)
}

function guncelleNot() {
    var t = document.getElementById("gnc_ttr").value,
        e = document.getElementById("gnc_tarea").value;
    S4.Phone.Notifications.Add("fas fa-check-circle", "Notlar", t + " Adlı not güncellendi."), $.post("http://s4-phone/NotGuncelle", JSON.stringify({
        baslik: t,
        aciklama: e,
        id: guncelleme_id
    }))
}

function silNot() {
    S4.Phone.Notifications.Add("fas fa-check-circle", "Notlar", "Notlar tekrar listelendi."), $.post("http://s4-phone/NotSil", JSON.stringify({
        id: guncelleme_id
    })), not(0)
}
Setuppolices = function(t) {
    if ($(".polices-list").html(""), t.length > 0) $.each(t, function(t, e) {
        var a = '<div class="police-list" id="policeid-' + t + '"> <div class="police-list-firstletter">' + e.firstname.charAt(0).toUpperCase() + '</div> <div class="police-list-fullname">' + e.firstname + " " + e.lastname + '</div> <div class="police-list-call"><i class="fas fa-phone"></i></div> </div>';
        $(".polices-list").append(a), $("#policeid-" + t).data("policeData", e)
    });
    else {
        $(".polices-list").append('<div class="police-list"><div class="no-polices">Şuanda müsait polis yok.</div></div>')
    }
}, $(document).on("click", ".police-list-call", function(t) {
    t.preventDefault();
    var e = $(this).parent().data("policeData"),
        a = {
            number: e.phone,
            name: e.name
        };
    $.post("http://s4-phone/CallContact", JSON.stringify({
        ContactData: a,
        Anonymous: S4.Phone.Data.AnonymousCall
    }), function(t) {
        a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
            display: "block"
        }), $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
            $(".polices-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
    })
});
var OpenedRaceElement = null;

function GetAmountOfRacers(t) {
    var e = 0;
    return $.each(t, function(t, a) {
        e += 1
    }), e
}

function IsInRace(t, e) {
    var a = !1;
    return $.each(e, function(e, n) {
        e == t && (a = !0)
    }), a
}

function IsCreator(t, e) {
    var a = !1;
    return e.SetupSteam == t && (a = !0), a
}

function SetupRaces(t) {
    $(".racing-races").html(""), t.length > 0 && (t = t.reverse(), $.each(t, function(t, e) {
        var a = '<i class="fas fa-unlock"></i> Henüz başlamadı';
        e.RaceData.Started && (a = '<i class="fas fa-lock"></i> Başlatıldı');
        var n = "";
        n = 0 == e.Laps ? "SPRINT" : 1 == e.Laps ? e.Laps + " Lap" : e.Laps + " Laps";
        var o = IsInRace(S4.Phone.Data.PlayerData.identifier, e.RaceData.Racers),
            i = IsCreator(S4.Phone.Data.PlayerData.identifier, e),
            s = '<div class="race-buttons"> <div class="race-button" id="join-race" data-toggle="racetooltip" data-placement="left" title="Katıl"><i class="fas fa-sign-in-alt"></i></div>';
        o && (s = i ? e.RaceData.Started ? '<div class="race-buttons"> <div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Ayrıl"><i class="fas fa-sign-out-alt"></i></div>' : '<div class="race-buttons"> <div class="race-button" id="start-race" data-toggle="racetooltip" data-placement="left" title="Başla"><i class="fas fa-flag-checkered"></i></div><div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Quit"><i class="fas fa-sign-out-alt"></i></div>' : '<div class="race-buttons"> <div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Ayrıl"><i class="fas fa-sign-out-alt"></i></div>');
        var c = GetAmountOfRacers(e.RaceData.Racers),
            l = '<div class="racing-race" id="raceid-' + t + '"> <span class="race-name"><i class="fas fa-flag-checkered"></i> ' + e.RaceData.RaceName + '</span> <span class="race-track">' + a + '</span> <div class="race-infomation"> <div class="race-infomation-tab" id="race-information-laps">' + n + '</div> <div class="race-infomation-tab" id="race-information-distance">' + e.RaceData.Distance + ' m</div> <div class="race-infomation-tab" id="race-information-player"><i class="fas fa-user"></i> ' + c + "</div> </div> " + s + " </div> </div>";
        $(".racing-races").append(l), $("#raceid-" + t).data("RaceData", e), e.RaceData.Started ? $("#raceid-" + t).css({
            "border-bottom-color": "#b12121"
        }) : $("#raceid-" + t).css({
            "border-bottom-color": "#34b121"
        }), $('[data-toggle="racetooltip"]').tooltip()
    }))
}

function secondsTimeSpanToHMS(t) {
    var e = Math.floor(t / 3600);
    t -= 3600 * e;
    var a = Math.floor(t / 60);
    return e + ":" + (a < 10 ? "0" + a : a) + ":" + ((t -= 60 * a) < 10 ? "0" + t : t)
}
$(document).ready(function() {
    $('[data-toggle="racetooltip"]').tooltip()
}), $(document).on("click", ".racing-race", function(t) {
    t.preventDefault();
    var e = $(this).data("RaceData"),
        a = IsInRace(S4.Phone.Data.PlayerData.identifier, e.RaceData.Racers);
    !e.RaceData.Started || a ? null === OpenedRaceElement ? ($(this).css({
        height: "15vh"
    }), setTimeout(() => {
        $(this).find(".race-buttons").fadeIn(100)
    }, 100), OpenedRaceElement = this) : OpenedRaceElement == this ? ($(this).find(".race-buttons").fadeOut(20), $(this).css({
        height: "9vh"
    }), OpenedRaceElement = null) : ($(OpenedRaceElement).find(".race-buttons").hide(), $(OpenedRaceElement).css({
        height: "9vh"
    }), $(this).css({
        height: "15vh"
    }), setTimeout(() => {
        $(this).find(".race-buttons").fadeIn(100)
    }, 100), OpenedRaceElement = this) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_STARTED"), "#1DA1F2")
}), $(document).ready(function() {
    $('[data-toggle="race-setup"]').tooltip()
}), $(document).on("click", "#join-race", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().attr("id"),
        a = $("#" + e).data("RaceData");
    $.post("http://s4-phone/IsInRace", JSON.stringify({}), function(t) {
        t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_INRACE"), "#1DA1F2") : $.post("http://s4-phone/RaceDistanceCheck", JSON.stringify({
            RaceId: a.RaceId,
            Joined: !0
        }), function(t) {
            t && $.post("http://s4-phone/IsBusyCheck", JSON.stringify({
                check: "editor"
            }), function(t) {
                t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_INEDITOR"), "#1DA1F2") : ($.post("http://s4-phone/JoinRace", JSON.stringify({
                    RaceData: a
                })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
                    SetupRaces(t)
                }))
            })
        })
    })
}), $(document).on("click", "#quit-race", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().attr("id"),
        a = $("#" + e).data("RaceData");
    $.post("http://s4-phone/LeaveRace", JSON.stringify({
        RaceData: a
    })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
        SetupRaces(t)
    })
}), $(document).on("click", "#start-race", function(t) {
    t.preventDefault();
    var e = $(this).parent().parent().attr("id"),
        a = $("#" + e).data("RaceData");
    $.post("http://s4-phone/StartRace", JSON.stringify({
        RaceData: a
    })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
        SetupRaces(t)
    })
}), $(".dropdown").click(function() {
    $(this).attr("tabindex", 1).focus(), $(this).toggleClass("active"), $(this).find(".dropdown-menu").slideToggle(300)
}), $(".dropdown").focusout(function() {
    $(this).removeClass("active"), $(this).find(".dropdown-menu").slideUp(300)
}), $(document).on("click", ".dropdown .dropdown-menu li", function(t) {
    $.post("http://s4-phone/GetTrackData", JSON.stringify({
        RaceId: $(this).attr("id")
    }), function(t) {
        t.CreatorData.charinfo.lastname.length > 8 && (t.CreatorData.charinfo.lastname = t.CreatorData.charinfo.lastname.substring(0, 8));
        var e = t.CreatorData.charinfo.firstname.charAt(0).toUpperCase() + ". " + t.CreatorData.charinfo.lastname;
        if ($(".racing-setup-information-distance").html("Mesafe: " + t.Distance + " m"), $(".racing-setup-information-creator").html("Yarış Sahibi: " + e), void 0 !== t.Records.Holder) {
            t.Records.Holder[1].length > 8 && (t.Records.Holder[1] = t.Records.Holder[1].substring(0, 8) + "..");
            var a = t.Records.Holder[0].charAt(0).toUpperCase() + ". " + t.Records.Holder[1];
            $(".racing-setup-information-wr").html("WR: " + secondsTimeSpanToHMS(t.Records.Time) + " (" + a + ")")
        } else $(".racing-setup-information-wr").html("WR: N/A")
    }), $(this).parents(".dropdown").find("span").text($(this).text()), $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"))
}), $(document).on("click", "#setup-race", function(t) {
    t.preventDefault(), $(".racing-overview").animate({
        left: "30vh"
    }, 300), $(".racing-setup").animate({
        left: 0
    }, 300), $.post("http://s4-phone/GetRaces", JSON.stringify({}), function(t) {
        null != t && ($(".dropdown-menu").html(""), $.each(t, function(t, e) {
            if (!e.Started && !e.Waiting) {
                var a = '<li id="' + e.RaceId + '">' + e.RaceName + "</li>";
                $(".dropdown-menu").append(a)
            }
        }))
    })
}), $(document).on("click", "#create-race", function(t) {
    t.preventDefault(), $.post("http://s4-phone/IsAuthorizedToCreateRaces", JSON.stringify({}), function(t) {
        t.IsAuthorized ? t.IsBusy ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_CREATED"), "#1DA1F2") : $.post("http://s4-phone/IsBusyCheck", JSON.stringify({
            check: "race"
        }), function(t) {
            t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_INRACE"), "#1DA1F2") : $(".racing-create").fadeIn(200)
        }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTSTART"), "#1DA1F2")
    })
}), $(document).on("click", "#racing-create-accept", function(t) {
    t.preventDefault();
    var e = $(".racing-create-trackname").val();
    "" !== e && null != e ? $.post("http://s4-phone/IsAuthorizedToCreateRaces", JSON.stringify({
        TrackName: e
    }), function(t) {
        t.IsAuthorized ? t.IsNameAvailable ? ($.post("http://s4-phone/StartTrackEditor", JSON.stringify({
            TrackName: e
        })), $(".racing-create").fadeOut(200, function() {
            $(".racing-create-trackname").val("")
        })) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTTHISNAME"), "#1DA1F2") : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTSTART"), "#1DA1F2")
    }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ENTER_TRACK"), "#1DA1F2")
}), $(document).on("click", "#racing-create-cancel", function(t) {
    t.preventDefault(), $(".racing-create").fadeOut(200, function() {
        $(".racing-create-trackname").val("")
    })
}), $(document).on("click", "#setup-race-accept", function(t) {
    t.preventDefault();
    var e = $(".dropdown").find("input").attr("value"),
        a = $(".racing-setup-laps").val();
    $.post("http://s4-phone/HasCreatedRace", JSON.stringify({}), function(t) {
        t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_ACTIVE"), "#1DA1F2") : $.post("http://s4-phone/RaceDistanceCheck", JSON.stringify({
            RaceId: e,
            Joined: !1
        }), function(t) {
            t && (void 0 !== e || null !== e ? "" !== a ? $.post("http://s4-phone/CanRaceSetup", JSON.stringify({}), function(t) {
                t ? ($.post("http://s4-phone/SetupRace", JSON.stringify({
                    RaceId: e,
                    AmountOfLaps: a
                })), $(".racing-overview").animate({
                    left: "0vh"
                }, 300), $(".racing-setup").animate({
                    left: "-30vh"
                }, 300, function() {
                    $(".racing-setup-information-distance").html("Bölüm seç"), $(".racing-setup-information-creator").html("Bölüm seç"), $(".racing-setup-information-wr").html("Bölüm seç"), $(".racing-setup-laps").val(""), $(".dropdown").find("input").removeAttr("value"), $(".dropdown").find("span").text("Bölüm seç")
                })) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANT_THIS_TIME"), "#1DA1F2")
            }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ENTER_ROUNDS"), "#1DA1F2") : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CHOSEN_TRACK"), "#1DA1F2"))
        })
    })
}), $(document).on("click", "#setup-race-cancel", function(t) {
    t.preventDefault(), $(".racing-overview").animate({
        left: "0vh"
    }, 300), $(".racing-setup").animate({
        left: "-30vh"
    }, 300, function() {
        $(".racing-setup-information-distance").html("Bölüm seç"), $(".racing-setup-information-creator").html("Bölüm seç"), $(".racing-setup-information-wr").html("Bölüm seç"), $(".racing-setup-laps").val(""), $(".dropdown").find("input").removeAttr("value"), $(".dropdown").find("span").text("Bölüm seç")
    })
}), $(document).on("click", ".racing-leaderboard-item", function(t) {
    t.preventDefault();
    var e = $(this).data("LeaderboardData");
    $(".racing-leaderboard-details-block-trackname").html('<i class="fas fa-flag-checkered"></i> ' + e.RaceName), $(".racing-leaderboard-details-block-list").html(""), $.each(e.LastLeaderboard, function(t, e) {
        var a = e.Holder[1],
            n = "N/A",
            o = t + 1;
        a.length > 10 && (a = a.substring(0, 10) + "..."), "DNF" !== e.BestLap ? n = secondsTimeSpanToHMS(e.BestLap) : o = "DNF";
        var i = '<div class="row"> <div class="name">' + e.Holder[0].charAt(0).toUpperCase() + ". " + a + '</div><div class="time">' + n + '</div><div class="score">' + o + "</div> </div>";
        $(".racing-leaderboard-details-block-list").append(i)
    }), $(".racing-leaderboard-details").fadeIn(200)
}), $(document).on("click", ".racing-leaderboard-details-back", function(t) {
    t.preventDefault(), $(".racing-leaderboard-details").fadeOut(200)
}), $(document).on("click", ".racing-leaderboards-button", function(t) {
    t.preventDefault(), $(".racing-leaderboard").animate({
        left: "-30vh"
    }, 300), $(".racing-overview").animate({
        left: "0vh"
    }, 300)
}), $(document).on("click", "#leaderboards-race", function(t) {
    t.preventDefault(), $.post("http://s4-phone/GetRacingLeaderboards", JSON.stringify({}), function(t) {
        null !== t && ($(".racing-leaderboards").html(""), $.each(t, function(t, e) {
            if (e.LastLeaderboard.length > 0) {
                var a = '<div class="racing-leaderboard-item" id="leaderboard-item-' + t + '"> <span class="racing-leaderboard-item-name"><i class="fas fa-flag-checkered"></i> ' + e.RaceName + '</span> <span class="racing-leaderboard-item-info">Detay için tıklayın!</span> </div>';
                $(".racing-leaderboards").append(a), $("#leaderboard-item-" + t).data("LeaderboardData", e)
            }
        }))
    }), $(".racing-overview").animate({
        left: "30vh"
    }, 300), $(".racing-leaderboard").animate({
        left: "0vh"
    }, 300)
});
var OpenedRaceElement = null;

function GetAmountOfRacers(t) {
    var e = 0;
    return $.each(t, function(t, a) {
        e += 1
    }), e
}

function IsInRace(t, e) {
    var a = !1;
    return $.each(e, function(e, n) {
        e == t && (a = !0)
    }), a
}

function IsCreator(t, e) {
    var a = !1;
    return e.SetupSteam == t && (a = !0), a
}

function SetupRaces(t) {
    $(".racing-races").html(""), t.length > 0 && (t = t.reverse(), $.each(t, function(t, e) {
        var a = '<i class="fas fa-unlock"></i> Henüz başlamadı';
        e.RaceData.Started && (a = '<i class="fas fa-lock"></i> Başlatıldı');
        var n = "";
        n = 0 == e.Laps ? "SPRINT" : 1 == e.Laps ? e.Laps + " Lap" : e.Laps + " Laps";
        var o = IsInRace(S4.Phone.Data.PlayerData.identifier, e.RaceData.Racers),
            i = IsCreator(S4.Phone.Data.PlayerData.identifier, e),
            s = '<div class="race-buttons"> <div class="race-button" id="join-race" data-toggle="racetooltip" data-placement="left" title="Katıl"><i class="fas fa-sign-in-alt"></i></div>';
        o && (s = i ? e.RaceData.Started ? '<div class="race-buttons"> <div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Ayrıl"><i class="fas fa-sign-out-alt"></i></div>' : '<div class="race-buttons"> <div class="race-button" id="start-race" data-toggle="racetooltip" data-placement="left" title="Başla"><i class="fas fa-flag-checkered"></i></div><div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Quit"><i class="fas fa-sign-out-alt"></i></div>' : '<div class="race-buttons"> <div class="race-button" id="quit-race" data-toggle="racetooltip" data-placement="right" title="Ayrıl"><i class="fas fa-sign-out-alt"></i></div>');
        var c = GetAmountOfRacers(e.RaceData.Racers),
            l = '<div class="racing-race" id="raceid-' + t + '"> <span class="race-name"><i class="fas fa-flag-checkered"></i> ' + e.RaceData.RaceName + '</span> <span class="race-track">' + a + '</span> <div class="race-infomation"> <div class="race-infomation-tab" id="race-information-laps">' + n + '</div> <div class="race-infomation-tab" id="race-information-distance">' + e.RaceData.Distance + ' m</div> <div class="race-infomation-tab" id="race-information-player"><i class="fas fa-user"></i> ' + c + "</div> </div> " + s + " </div> </div>";
        $(".racing-races").append(l), $("#raceid-" + t).data("RaceData", e), e.RaceData.Started ? $("#raceid-" + t).css({
            "border-bottom-color": "#b12121"
        }) : $("#raceid-" + t).css({
            "border-bottom-color": "#34b121"
        }), $('[data-toggle="racetooltip"]').tooltip()
    }))
}

function secondsTimeSpanToHMS(t) {
    var e = Math.floor(t / 3600);
    t -= 3600 * e;
    var a = Math.floor(t / 60);
    return e + ":" + (a < 10 ? "0" + a : a) + ":" + ((t -= 60 * a) < 10 ? "0" + t : t)
}

function ust_menu_ac(t) {
    "down" == t && ($(".ustbar").css({
        display: "block"
    }), setTimeout(function() {
        $(".ustbar").css({
            height: "55vh"
        })
    }, 100)), "right" == t && 1 == donmus && ($(".ustbar").css({
        display: "block"
    }), setTimeout(function() {
        $(".ustbar").css({
            height: "55vh"
        })
    }, 100)), "left" == t && 1 == donmus && ($(".ustbar").css({
        height: "0vh",
        "backdrop-filter": ""
    }), setTimeout(function() {
        $(".ustbar").css({
            display: "none"
        })
    }, 1e3)), "up" == t && ($(".ustbar").css({
        height: "0vh",
        "backdrop-filter": ""
    }), setTimeout(function() {
        $(".ustbar").css({
            display: "none"
        })
    }, 1e3))
}

function sayiekle(t) {
    document.form.text.value = document.form.text.value + t
}

function sonuc() {
    var deger = document.form.text.value;
    deger && (document.form.text.value = eval(deger))
}

function hepsiniSil() {
    document.form.text.value = ""
}

function sil2() {
    var t = document.form.text.value;
    document.form.text.value = t.substring(0, t.length - 1)
}

function formEngelle(t) {
    if (13 === (t = t || window.event).which) return t.preventDefault(), !1
}

function paylasBT() {
    $.post("http://s4-phone/s4shareGET", JSON.stringify({}), function(t) {
        ListeleBT(t), $(".BTT").css("display", "block")
    })
}

function paylasBTKP() {
    $(".BTT").css("display", "none")
}
$(document).ready(function() {
        $('[data-toggle="racetooltip"]').tooltip()
    }), $(document).on("click", ".racing-race", function(t) {
        t.preventDefault();
        var e = $(this).data("RaceData"),
            a = IsInRace(S4.Phone.Data.PlayerData.identifier, e.RaceData.Racers);
        !e.RaceData.Started || a ? null === OpenedRaceElement ? ($(this).css({
            height: "15vh"
        }), setTimeout(() => {
            $(this).find(".race-buttons").fadeIn(100)
        }, 100), OpenedRaceElement = this) : OpenedRaceElement == this ? ($(this).find(".race-buttons").fadeOut(20), $(this).css({
            height: "9vh"
        }), OpenedRaceElement = null) : ($(OpenedRaceElement).find(".race-buttons").hide(), $(OpenedRaceElement).css({
            height: "9vh"
        }), $(this).css({
            height: "15vh"
        }), setTimeout(() => {
            $(this).find(".race-buttons").fadeIn(100)
        }, 100), OpenedRaceElement = this) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_STARTED"), "#1DA1F2")
    }), $(document).ready(function() {
        $('[data-toggle="race-setup"]').tooltip()
    }), $(document).on("click", "#join-race", function(t) {
        t.preventDefault();
        var e = $(this).parent().parent().attr("id"),
            a = $("#" + e).data("RaceData");
        $.post("http://s4-phone/IsInRace", JSON.stringify({}), function(t) {
            t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_INRACE"), "#1DA1F2") : $.post("http://s4-phone/RaceDistanceCheck", JSON.stringify({
                RaceId: a.RaceId,
                Joined: !0
            }), function(t) {
                t && $.post("http://s4-phone/IsBusyCheck", JSON.stringify({
                    check: "editor"
                }), function(t) {
                    t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_INEDITOR"), "#1DA1F2") : ($.post("http://s4-phone/JoinRace", JSON.stringify({
                        RaceData: a
                    })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
                        SetupRaces(t)
                    }))
                })
            })
        })
    }), $(document).on("click", "#quit-race", function(t) {
        t.preventDefault();
        var e = $(this).parent().parent().attr("id"),
            a = $("#" + e).data("RaceData");
        $.post("http://s4-phone/LeaveRace", JSON.stringify({
            RaceData: a
        })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
            SetupRaces(t)
        })
    }), $(document).on("click", "#start-race", function(t) {
        t.preventDefault();
        var e = $(this).parent().parent().attr("id"),
            a = $("#" + e).data("RaceData");
        $.post("http://s4-phone/StartRace", JSON.stringify({
            RaceData: a
        })), $.post("http://s4-phone/GetAvailableRaces", JSON.stringify({}), function(t) {
            SetupRaces(t)
        })
    }), $(".dropdown").click(function() {
        $(this).attr("tabindex", 1).focus(), $(this).toggleClass("active"), $(this).find(".dropdown-menu").slideToggle(300)
    }), $(".dropdown").focusout(function() {
        $(this).removeClass("active"), $(this).find(".dropdown-menu").slideUp(300)
    }), $(document).on("click", ".dropdown .dropdown-menu li", function(t) {
        $.post("http://s4-phone/GetTrackData", JSON.stringify({
            RaceId: $(this).attr("id")
        }), function(t) {
            t.CreatorData.charinfo.lastname.length > 8 && (t.CreatorData.charinfo.lastname = t.CreatorData.charinfo.lastname.substring(0, 8));
            var e = t.CreatorData.charinfo.firstname.charAt(0).toUpperCase() + ". " + t.CreatorData.charinfo.lastname;
            if ($(".racing-setup-information-distance").html("Mesafe: " + t.Distance + " m"), $(".racing-setup-information-creator").html("Yarış Sahibi: " + e), void 0 !== t.Records.Holder) {
                t.Records.Holder[1].length > 8 && (t.Records.Holder[1] = t.Records.Holder[1].substring(0, 8) + "..");
                var a = t.Records.Holder[0].charAt(0).toUpperCase() + ". " + t.Records.Holder[1];
                $(".racing-setup-information-wr").html("WR: " + secondsTimeSpanToHMS(t.Records.Time) + " (" + a + ")")
            } else $(".racing-setup-information-wr").html("WR: N/A")
        }), $(this).parents(".dropdown").find("span").text($(this).text()), $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"))
    }), $(document).on("click", "#setup-race", function(t) {
        t.preventDefault(), $(".racing-overview").animate({
            left: "30vh"
        }, 300), $(".racing-setup").animate({
            left: 0
        }, 300), $.post("http://s4-phone/GetRaces", JSON.stringify({}), function(t) {
            null != t && ($(".dropdown-menu").html(""), $.each(t, function(t, e) {
                if (!e.Started && !e.Waiting) {
                    var a = '<li id="' + e.RaceId + '">' + e.RaceName + "</li>";
                    $(".dropdown-menu").append(a)
                }
            }))
        })
    }), $(document).on("click", "#create-race", function(t) {
        t.preventDefault(), $.post("http://s4-phone/IsAuthorizedToCreateRaces", JSON.stringify({}), function(t) {
            t.IsAuthorized ? t.IsBusy ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_CREATED"), "#1DA1F2") : $.post("http://s4-phone/IsBusyCheck", JSON.stringify({
                check: "race"
            }), function(t) {
                t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_INRACE"), "#1DA1F2") : $(".racing-create").fadeIn(200)
            }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTSTART"), "#1DA1F2")
        })
    }), $(document).on("click", "#racing-create-accept", function(t) {
        t.preventDefault();
        var e = $(".racing-create-trackname").val();
        "" !== e && null != e ? $.post("http://s4-phone/IsAuthorizedToCreateRaces", JSON.stringify({
            TrackName: e
        }), function(t) {
            t.IsAuthorized ? t.IsNameAvailable ? ($.post("http://s4-phone/StartTrackEditor", JSON.stringify({
                TrackName: e
            })), $(".racing-create").fadeOut(200, function() {
                $(".racing-create-trackname").val("")
            })) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTTHISNAME"), "#1DA1F2") : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANTSTART"), "#1DA1F2")
        }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ENTER_TRACK"), "#1DA1F2")
    }), $(document).on("click", "#racing-create-cancel", function(t) {
        t.preventDefault(), $(".racing-create").fadeOut(200, function() {
            $(".racing-create-trackname").val("")
        })
    }), $(document).on("click", "#setup-race-accept", function(t) {
        t.preventDefault();
        var e = $(".dropdown").find("input").attr("value"),
            a = $(".racing-setup-laps").val();
        $.post("http://s4-phone/HasCreatedRace", JSON.stringify({}), function(t) {
            t ? S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ALREADY_ACTIVE"), "#1DA1F2") : $.post("http://s4-phone/RaceDistanceCheck", JSON.stringify({
                RaceId: e,
                Joined: !1
            }), function(t) {
                t && (void 0 !== e || null !== e ? "" !== a ? $.post("http://s4-phone/CanRaceSetup", JSON.stringify({}), function(t) {
                    t ? ($.post("http://s4-phone/SetupRace", JSON.stringify({
                        RaceId: e,
                        AmountOfLaps: a
                    })), $(".racing-overview").animate({
                        left: "0vh"
                    }, 300), $(".racing-setup").animate({
                        left: "-30vh"
                    }, 300, function() {
                        $(".racing-setup-information-distance").html("Bölüm seç"), $(".racing-setup-information-creator").html("Bölüm seç"), $(".racing-setup-information-wr").html("Bölüm seç"), $(".racing-setup-laps").val(""), $(".dropdown").find("input").removeAttr("value"), $(".dropdown").find("span").text("Bölüm seç")
                    })) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CANT_THIS_TIME"), "#1DA1F2")
                }) : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_ENTER_ROUNDS"), "#1DA1F2") : S4.Phone.Notifications.Add("fas fa-flag-checkered", S4.Phone.Functions.Lang("RACING_TITLE"), S4.Phone.Functions.Lang("RACING_CHOSEN_TRACK"), "#1DA1F2"))
            })
        })
    }), $(document).on("click", "#setup-race-cancel", function(t) {
        t.preventDefault(), $(".racing-overview").animate({
            left: "0vh"
        }, 300), $(".racing-setup").animate({
            left: "-30vh"
        }, 300, function() {
            $(".racing-setup-information-distance").html("Bölüm seç"), $(".racing-setup-information-creator").html("Bölüm seç"), $(".racing-setup-information-wr").html("Bölüm seç"), $(".racing-setup-laps").val(""), $(".dropdown").find("input").removeAttr("value"), $(".dropdown").find("span").text("Bölüm seç")
        })
    }), $(document).on("click", ".racing-leaderboard-item", function(t) {
        t.preventDefault();
        var e = $(this).data("LeaderboardData");
        $(".racing-leaderboard-details-block-trackname").html('<i class="fas fa-flag-checkered"></i> ' + e.RaceName), $(".racing-leaderboard-details-block-list").html(""), $.each(e.LastLeaderboard, function(t, e) {
            var a = e.Holder[1],
                n = "N/A",
                o = t + 1;
            a.length > 10 && (a = a.substring(0, 10) + "..."), "DNF" !== e.BestLap ? n = secondsTimeSpanToHMS(e.BestLap) : o = "DNF";
            var i = '<div class="row"> <div class="name">' + e.Holder[0].charAt(0).toUpperCase() + ". " + a + '</div><div class="time">' + n + '</div><div class="score">' + o + "</div> </div>";
            $(".racing-leaderboard-details-block-list").append(i)
        }), $(".racing-leaderboard-details").fadeIn(200)
    }), $(document).on("click", ".racing-leaderboard-details-back", function(t) {
        t.preventDefault(), $(".racing-leaderboard-details").fadeOut(200)
    }), $(document).on("click", ".racing-leaderboards-button", function(t) {
        t.preventDefault(), $(".racing-leaderboard").animate({
            left: "-30vh"
        }, 300), $(".racing-overview").animate({
            left: "0vh"
        }, 300)
    }), $(document).on("click", "#leaderboards-race", function(t) {
        t.preventDefault(), $.post("http://s4-phone/GetRacingLeaderboards", JSON.stringify({}), function(t) {
            null !== t && ($(".racing-leaderboards").html(""), $.each(t, function(t, e) {
                if (e.LastLeaderboard.length > 0) {
                    var a = '<div class="racing-leaderboard-item" id="leaderboard-item-' + t + '"> <span class="racing-leaderboard-item-name"><i class="fas fa-flag-checkered"></i> ' + e.RaceName + '</span> <span class="racing-leaderboard-item-info">Detay için tıklayın!</span> </div>';
                    $(".racing-leaderboards").append(a), $("#leaderboard-item-" + t).data("LeaderboardData", e)
                }
            }))
        }), $(".racing-overview").animate({
            left: "30vh"
        }, 300), $(".racing-leaderboard").animate({
            left: "0vh"
        }, 300)
    }), SetupDrivers = function(t) {
        if ($(".driver-list").html(""), t.length > 0) $.each(t, function(t, e) {
            var a = '<div class="taxi-list" id="taxiid-' + t + '"> <div class="taxi-list-firstletter">' + e.name.charAt(0).toUpperCase() + '</div> <div class="taxi-list-fullname">' + e.name + '</div> <div class="taxi-list-call"><i class="fas fa-phone"></i></div> </div>';
            $(".driver-list").append(a), $("#taxiid-" + t).data("taxiData", e)
        });
        else {
            $(".driver-list").append('<div class="taxi-list"><div class="no-driver">There are no Taxi available..</div></div>')
        }
    }, $(document).on("click", ".taxi-list-call", function(t) {
        t.preventDefault();
        var e = $(this).parent().data("taxiData"),
            a = {
                number: e.phone,
                name: e.name
            };
        $.post("http://s4-phone/CallContact", JSON.stringify({
            ContactData: a,
            Anonymous: S4.Phone.Data.AnonymousCall
        }), function(t) {
            a.number !== S4.Phone.Data.PlayerData.charinfo.phone ? t.IsOnline ? t.CanCall ? t.InCall ? S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_BUSY")) : (S4.Phone.Data.AnonymousCall && S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_STARTED_ANON")), $(".phone-call-outgoing").css({
                display: "block"
            }), $(".phone-call-incoming").css({
                display: "none"
            }), $(".phone-call-ongoing").css({
                display: "none"
            }), $(".phone-call-outgoing-caller").html(a.name), S4.Phone.Functions.HeaderTextColor("white", 400), S4.Phone.Animations.TopSlideUp(".phone-application-container", 400, -160), setTimeout(function() {
                $(".lawyers-app").css({
                    display: "none"
                }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
            }, 450), CallData.name = a.name, CallData.number = a.number, S4.Phone.Data.currentApplication = "phone-call") : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_PERSON_TALKING")) : cagriManager(0) : S4.Phone.Notifications.Add("fas fa-phone", S4.Phone.Functions.Lang("PHONE_TITLE"), S4.Phone.Functions.Lang("PHONE_YOUR_NUMBER"))
        })
    }),
    function() {
        function t() {
            return a = x - x1, b = y - y1, parseInt(Math.sqrt(a * a + b * b), 10) < THRESHOLD ? "none" : x1 - x > Math.abs(y - y1) ? "left" : x - x1 > Math.abs(y - y1) ? "right" : y1 - y > Math.abs(x - x1) ? "up" : y - y1 > Math.abs(x - x1) ? "down" : void 0
        }
        THRESHOLD = 15, x = y = x1 = y1 = 0, recordedTime = (new Date).getTime(), document.documentElement.addEventListener("touchstart", function(t) {
            50 < (new Date).getTime() - recordedTime && (x = parseInt(t.changedTouches[0].pageX, 10), y = parseInt(t.changedTouches[0].pageY, 10), recordedTime = (new Date).getTime())
        }, !1), document.documentElement.addEventListener("touchend", function(e) {
            x1 = x, y1 = y, x = parseInt(e.changedTouches[0].pageX, 10), y = parseInt(e.changedTouches[0].pageY, 10), ust_menu_ac(t()), recordedTime = (new Date).getTime()
        }, !1), document.documentElement.addEventListener("mousedown", function(t) {
            50 < (new Date).getTime() - recordedTime && (x = t.clientX, y = t.clientY, recordedTime = (new Date).getTime())
        }, !1), document.documentElement.addEventListener("mouseup", function(e) {
            x1 = x, y1 = y, x = e.clientX, y = e.clientY, ust_menu_ac(t()), recordedTime = (new Date).getTime()
        }, !1), document.documentElement.style.userSelect = "none"
    }(), $(function() {
        $(".hesapmakinesi-app ").click(function() {
            $(".text").focus()
        }), $(".text").keydown(function(t) {
            -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 109, 110, 190]) || 65 == t.keyCode && !0 === t.ctrlKey || 67 == t.keyCode && !0 === t.ctrlKey || 88 == t.keyCode && !0 === t.ctrlKey || 55 == t.keyCode && !0 === t.shiftKey || 109 == t.keyCode || 107 == t.keyCode || 106 == t.keyCode || t.keyCode >= 35 && t.keyCode <= 39 || (t.shiftKey || t.keyCode < 48 || t.keyCode > 57) && (t.keyCode < 96 || t.keyCode > 105) && t.preventDefault()
        })
    }), document.onkeyup = function(t) {
        13 == t.which && sonuc()
    };
var lastcagri = 1;

function cagriManager(t) {
    if (0 == t) {
        $(".phone-call-incoming").css({
            display: "none"
        }), $(".phone-call-outgoing").css({
            display: "none"
        }), $(".phone-call-ongoing").css({
            display: "none"
        }), $(".phone-call-bilgi").css({
            display: "block"
        }), $(".phone-call-bilgi-caller").html("Ulaşılamıyor"), setTimeout(function() {
            $(".phone-app").css({
                display: "none"
            }), S4.Phone.Animations.TopSlideDown(".phone-application-container", 400, 0), S4.Phone.Functions.ToggleApp("phone-call", "block")
        }, 450), S4.Phone.Functions.HeaderTextColor("white", 500), S4.Phone.Animations.TopSlideDown(".phone-application-container", 500, 0), S4.Phone.Animations.TopSlideDown(".phone-call-app", 500, 0), S4.Phone.Functions.ToggleApp("phone-call", "block"), S4.Phone.Data.currentApplication = "phone-call";
        var e = document.getElementById("audio");
        $("#audio").attr("src", "../html/ses/0_" + lastcagri + ".ogg"), e.play(), lastcagri = 1 == lastcagri ? 2 : 1
    }
}