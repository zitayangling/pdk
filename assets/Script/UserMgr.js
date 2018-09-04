cc.Class({
    extends: cc.Component,
    properties: {
        isGameOut: false,

        account: null,
        us: null,      //星球信息
        key: null,  //
        ct: null, //系統當前時間
        ore_nums: null,
        userId: null,
        userName: null,
        phone: null,
        yqPhone: null,
        code: null,
        pwd: null,
        lv: 0,
        list: null,
        starMsg: null,
        isBand: false,
        details: null,
        orderId: null,

        starIndex:null,

        msgList: [],

        tg: null, //tuoguan
        customerQQ: null,
        ggao: null,//公告
        ewmId: null,

        sysDealId: null, //系统单号
        one: null,
        two: null,
        three: null,
        four: null,
        five:null,
        six:null,
        singular: null,
        even: null,

        hasDeal: false,


        wxUrl: "",
        zfbUrl: "",

        searchId: null,

        exp: 0,
        coins: 0,
        gems: 0,
        sign: 0,
        ip: "",
        sex: 0,
        roomId: null,
        login_mode: null,
        room_conf: null,
        room_type: null,
        oldRoomId: null,
        header_image: "",
        is_sign_in: false,
        noticeData: null,
        bNewNotice: false,
        bGameOver: false,
        gameType: "",

    },

    guestAuth: function () {
        var account = cc.args["account"];
        if (account == null) {
            account = cc.sys.localStorage.getItem("account");
        }

        if (account == null) {
            account = Date.now();
            cc.sys.localStorage.setItem("account", account + "");
        }

        cc.vv.http.sendRequest("/guest", { account: account }, this.onAuth);
    },

    onAuth: function (ret) {
        var self = cc.vv.userMgr;
        if (ret.errcode !== 0) {
            console.log(ret.errmsg);
        }
        else {
            self.account = ret.account;
            self.sign = ret.sign;
            cc.vv.http.url = "http://" + cc.vv.SI.hall;
            self.login();
        }
    },

    login: function () {
        var self = this;
        var onLogin = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                if (!ret.userid) {
                    //jump to register user info.
                    //  cc.director.loadScene("main");
                    //  cc.vv.wc.hide();
                    //   cc.vv.alert.show("注册","清先注册用户!",null,false);
                    cc.vv.wc.show("正在注册用户，请稍后...");
                    //  var _account =  "guest" + parseInt(Math.random() * 10000);
                    cc.vv.http.sendRequest("/create_user",
                        {
                            account: self.account,
                            name: "pwz" + parseInt(Math.random() * 100000000),
                            sign: self.sign,
                            needMoney: cc.vv.SI.mode === 'check' && cc.sys.os == cc.sys.OS_IOS,
                        },
                        function (ret) {
                            cc.vv.wc.hide();
                            cc.vv.wc.hide();
                            if (ret.errcode === 0) {
                                cc.vv.http.sendRequest("/get_user_info", { account: self.account, sign: self.sign }, onLogin);
                            } else {
                                //  cc.vv.alert.show("注册", "注册失败!", null, false);
                                cc.vv.utils.showErrorInfoByErrorCode(ret.errcode);
                            }
                        });
                }
                else {
                    console.log(ret);
                    self.account = ret.account;
                    self.userId = ret.userid;
                    self.userName = ret.name;
                    self.lv = ret.lv;
                    self.exp = ret.exp;
                    self.coins = ret.coins;
                    self.gems = ret.gems;
                    self.roomId = ret.roomid;
                    self.sex = ret.sex;
                    self.ip = ret.ip;
                    self.header_image = ret.header_image;
                    self.is_sign_in = ret.is_sign_in;
                    cc.director.loadScene("main");
                    // cc.vv.wc.hide();
                }
            }
        };
        cc.vv.wc.show("正在登录游戏");
        cc.vv.http.sendRequest("/get_user_info", { account: this.account, sign: this.sign }, onLogin);
    },

    create: function (name) {
        var self = this;
        var onCreate = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                self.login();
            }
        };

        var data = {
            account: this.account,
            sign: this.sign,
            name: name
        };
        cc.vv.http.sendRequest("/create_user", data, onCreate);
    },

    enterRoom: function (roomId, game_type, callback) {
        var self = this;
        var onEnter = function (ret) {
            if (ret.errcode !== 0) {
                if (ret.errcode == -1) {
                    setTimeout(function () {
                        self.enterRoom(roomId, game_type, callback);
                    }, 5000);
                }
                else {
                    cc.vv.wc.hide();
                    if (callback != null) {
                        callback(ret);
                    }
                }
            }
            else {
                if (callback != null) {
                    callback(ret);
                }
                cc.vv.net.ip = ret.ip + ":" + ret.port;
                cc.log("game room info  " + ret.ip + "  " + ret.port);

                cc.vv.utils.enterScene();

                //cc.vv.gameNetMgr.connectGameServer(ret);
            }
        };

        // var data = {
        //     account:cc.vv.userMgr.account,
        //     sign:cc.vv.userMgr.sign,
        //     roomid:roomId
        // };

        var conf = {
            game_type: game_type,
            room_type: 0,
            ju: 0,     // 20局   40局    60局
            time: 0, // 30分钟   60分钟    90分钟
            paitype: 0,//0 全副牌 1半副牌
            difen: 0,   //1分，  2分，    5分
            daikai: 0,//0 不代开  1代开
        };
        // login_mode:0表示创建私有房间, room_type必须为0
        // :1表示登陆私有房间,room_type必须为0,room_id必须有效
        // :2表示登陆公有房间,room_type(1-4,朋友,普通场,精英场,土豪场)

        console.log(conf);
        var data = {
            game_type: game_type,
            userid: cc.vv.userMgr.userId,
            login_mode: 1,
            room_id: roomId,
            room_conf: JSON.stringify(conf)
        };

        cc.vv.wc.show("正在进入房间:" + roomId);
        cc.vv.http.sendRequest("/get_game_room_info", data, onEnter);

        cc.vv.userMgr.roomId = roomId;
        cc.vv.userMgr.login_mode = 1;
        cc.vv.userMgr.room_conf = conf;
    },

    getHistoryList: function (callback) {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                console.log(ret.history);
                if (callback != null) {
                    callback(ret.history);
                }
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
        };
        cc.vv.http.sendRequest("/get_history_list", data, onGet);
    },
    getGamesOfRoom: function (uuid, callback) {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                console.log(ret.data);
                callback(ret.data);
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            uuid: uuid,
        };
        cc.vv.http.sendRequest("/get_games_of_room", data, onGet);
    },

    getDetailOfGame: function (uuid, index, callback) {
        var self = this;
        var onGet = function (ret) {
            if (ret.errcode !== 0) {
                console.log(ret.errmsg);
            }
            else {
                console.log(ret.data);
                callback(ret.data);
            }
        };

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            uuid: uuid,
            index: index,
        };
        cc.vv.http.sendRequest("/get_detail_of_game", data, onGet);
    },
    getWanfa: function () {
        if (this.room_conf === null) return "";
        var _conf = "";
        if (this.room_conf.ju === 0)
            _conf += "游戏时间 " + this.room_conf.time;
        else
            _conf += "游戏局数 " + this.room_conf.ju;

        _conf += " 底分" + this.room_conf.difen;
        if (this.room_conf.paitype == 0)
            _conf += " 全副牌";
        else
            _conf += " 半副牌";

        return _conf;



    }
});
