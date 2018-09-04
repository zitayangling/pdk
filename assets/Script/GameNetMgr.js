cc.Class({
    extends: cc.Component,

    properties: {
        dataEventHandler: null,
        ip: null,
        port: null,
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    reset: function () {
    },

    dispatchEvent(event, data) {
        if (this.dataEventHandler) {
            this.dataEventHandler.emit(event, data);
        }
    },


    initHandlers: function () {
        var self = this;
        //进入房间结果
        cc.vv.net.addHandler("enter_room_result", function (data) {
            cc.log("io got data : enter_room_result" + data);
            cc.log(data);
            self.dispatchEvent('enter_room_result', data);
        });

        //有观战玩家进入
        cc.vv.net.addHandler("notice_bystander_come", function (data) {
            cc.log("io got data : notice_bystander_come" + data);
            cc.log(data);
            self.dispatchEvent('notice_bystander_come', data);
        });

        //有玩家进入房间
        cc.vv.net.addHandler("user_come_room", function (data) {
            cc.log("io got data : user_come_room" + data);
            cc.log(data);
            self.dispatchEvent('user_come_room', data);
        });

        //有玩家上线
        cc.vv.net.addHandler("notice_user_online", function (data) {
            cc.log("io got data : notice_user_online" + data);
            cc.log(data);
            self.dispatchEvent('notice_user_online', data);
        });

        //ip相同更改通知
        cc.vv.net.addHandler("notice_ip_same", function (data) {
            cc.log("io got data : notice_ip_same" + data);
            cc.log(data);
            self.dispatchEvent('notice_ip_same', data);
        });

        //发牌
        cc.vv.net.addHandler("send_user_card", function (data) {
            cc.log("io got data : send_user_card" + data);
            cc.log(data);
            self.dispatchEvent('send_user_card', data);
        });

        //通知客户端进行选择
        cc.vv.net.addHandler("select_game_action", function (data) {
            cc.log("io got data : select_game_action" + data);
            cc.log(data);
            self.dispatchEvent('select_game_action', data);
        });

        //通知我等待
        cc.vv.net.addHandler("notic_wait_select", function (data) {
            cc.log("io got data : notic_wait_select" + data);
            cc.log(data);
            self.dispatchEvent('notic_wait_select', data);
        });

        //通知其他玩家决定结果
        cc.vv.net.addHandler("notice_user_decide", function (data) {
            cc.log("io got data : notice_user_decide" + data);
            cc.log(data);
            self.dispatchEvent('notice_user_decide', data);
        });

        //服务器公布当前局结果
        cc.vv.net.addHandler("notice_game_result", function (data) {
            cc.log("io got data : notice_game_result" + data);
            cc.log(data);
            self.dispatchEvent('notice_game_result', data);
        });

        //有人退出房间
        cc.vv.net.addHandler("notice_user_exit", function (data) {
            cc.log("io got data : notice_user_exit" + data);
            cc.log(data);
            self.dispatchEvent('notice_user_exit', data);
        });

        //观战者 退出房间
        cc.vv.net.addHandler("notice_bystander_exit", function (data) {
            cc.log("io got data : notice_bystander_exit" + data);
            cc.log(data);
            self.dispatchEvent('notice_bystander_exit', data);
        });

        //玩家掉线通知
        cc.vv.net.addHandler("notice_user_offline", function (data) {
            cc.log("io got data : notice_user_offline" + data);
            cc.log(data);
            self.dispatchEvent('notice_user_offline', data);
        });

        //游戏结束 通知结果
        cc.vv.net.addHandler("notice_game_over", function (data) {
            cc.log("io got data : notice_game_over" + data);
            cc.log(data);
            self.dispatchEvent('notice_game_over', data);

        });
        //通知其他玩家准备
        cc.vv.net.addHandler("notice_user_ready", function (data) {
            cc.log("io got data : notice_user_ready" + data);
            cc.log(data);
            self.dispatchEvent('notice_user_ready', data);

        });
        //奖池更新消息
        cc.vv.net.addHandler("notice_jackopt_changed", function (data) {
            cc.log("io got data : notice_jackopt_changed" + data);
            cc.log(data);
            self.dispatchEvent('notice_jackopt_changed', data);

        });
        //自己被服务器踢出
        cc.vv.net.addHandler("notice_force_kick", function (data) {
            cc.log("io got data : notice_force_kick" + data);
            cc.log(data);
            self.dispatchEvent('notice_force_kick', data);
        });

        //收到聊天消息
        cc.vv.net.addHandler("chat_result_push", function (data) {
            cc.log("io got data : chat_result_push" + data);
            cc.log(data);
            self.dispatchEvent('chat_result_push', data);
        });

        //收到语音消息
        cc.vv.net.addHandler("voice_msg", function (data) {
            cc.log("io got data : voice_msg" + data);
            cc.log(data);
            self.dispatchEvent('voice_msg', data);
        });

        //收到让我叫分
        cc.vv.net.addHandler("notice_call_score", function (data) {
            cc.log("io got data : notice_call_score" + data);
            cc.log(data);
            self.dispatchEvent('notice_call_score', data);
        });

        //通知客户端那国人叫老几分
        cc.vv.net.addHandler("notice_call_score_result", function (data) {
            cc.log("io got data : notice_call_score_result" + data);
            cc.log(data);
            self.dispatchEvent('notice_call_score_result', data);
        });

        //通知客户端 谁是地主 地主的三张牌是啥
        cc.vv.net.addHandler("notice_player_poker", function (data) {
            cc.log("io got data : notice_player_poker" + data);
            cc.log(data);
            self.dispatchEvent('notice_player_poker', data);
        });

        //通知客户端  该谁出牌
        cc.vv.net.addHandler("notice_who_play", function (data) {
            cc.log("io got data : notice_who_play" + data);
            cc.log(data);
            self.dispatchEvent('notice_who_play', data);
        });

        //通知客户端出的啥牌
        cc.vv.net.addHandler("notice_hand_card", function (data) {
            cc.log("io got data : notice_hand_card" + data);
            cc.log(data);
            self.dispatchEvent('notice_hand_card', data);
        });
        //通知客户端重新发牌
        cc.vv.net.addHandler("notice_restart_game", function (data) {
            cc.log("io got data : notice_restart_game" + data);
            cc.log(data);
            self.dispatchEvent('notice_restart_game', data);
        });

        //出现炸弹倍数发生变化
        cc.vv.net.addHandler("notice_changed_twice", function (data) {
            cc.log("io got data : notice_changed_twice" + data);
            cc.log(data);
            self.dispatchEvent('notice_changed_twice', data);
        });

        //换桌成功
        cc.vv.net.addHandler("change_seat_result", function (data) {
            cc.log("io got data : change_seat_result" + data);
            cc.log(data);
            self.dispatchEvent('change_seat_result', data);
        });

        //托管消息
        cc.vv.net.addHandler("notice_use_bot", function (data) {
            cc.log("io got data : notice_use_bot" + data);
            cc.log(data);
            self.dispatchEvent('notice_use_bot', data);
        });

        //当玩家申请使用记牌器,服务器会通知该玩家
        cc.vv.net.addHandler("notice_use_cm_result", function (data) {
            cc.log("io got data : notice_use_cm_result" + data);
            cc.log(data);
            self.dispatchEvent('notice_use_cm_result', data);
        });

        //玩家申请购买记牌器
        cc.vv.net.addHandler("notice_buy_cm_result", function (data) {
            cc.log("io got data : notice_buy_cm_result" + data);
            cc.log(data);
            self.dispatchEvent('notice_buy_cm_result', data);
        });


        //显示记牌器数量
        // cc.vv.net.addHandler("query_card_marker", function (data) {
        //     cc.log("io got data : query_card_marker" + data.count);
        //     self.dispatchEvent('query_card_marker', data);
        // });

        cc.vv.net.addHandler("query_cm_result", function (data) {
            cc.log("io got data : query_cm_result" + data);
            cc.log(data);
            self.dispatchEvent('query_cm_result', data);
        });
        //服务器会通知所有客户端庄家信息
        cc.vv.net.addHandler("notice_zhuang_jia", function (data) {
            cc.log("io got data : notice_zhuang_jia" + data);
            cc.log(data);
            self.dispatchEvent('notice_zhuang_jia', data);
        });

        //通知指定客户端所摸的牌。
        cc.vv.net.addHandler("notice_mo_pai", function (data) {
            cc.log("io got data : notice_mo_pai" + data);
            cc.log(data);
            self.dispatchEvent('notice_mo_pai', data);
        });

        //通知指定客户端其他人摸牌
        cc.vv.net.addHandler("notice_mo_pai_other", function (data) {
            cc.log("io got data : notice_mo_pai_other" + data);
            cc.log(data);
            self.dispatchEvent('notice_mo_pai_other', data);
        });


        //玩家会收到对应的操作命令
        cc.vv.net.addHandler("notice_player_action", function (data) {
            cc.log("io got data : notice_player_action" + data);
            cc.log(data);
            self.dispatchEvent('notice_player_action', data);
        });

        //操作命令结果
        cc.vv.net.addHandler("notice_hand_card", function (data) {
            cc.log("io got data : notice_hand_card" + data);
            cc.log(data);
            self.dispatchEvent('notice_hand_card', data);
        });


        //清理牌桌上的牌
        cc.vv.net.addHandler("notice_clear_card", function (data) {
            cc.log("io got data : notice_clear_card" + data);
            cc.log(data);
            self.dispatchEvent('notice_clear_card', data);
        });

        //游戏中进行立即结算
        cc.vv.net.addHandler("immd_close_account", function (data) {
            cc.log("io got data : immd_close_account" + data);
            cc.log(data);
            self.dispatchEvent('immd_close_account', data);
        });

    },


    connectGameServer: function () {
        this.dissoveData = null;
        // cc.vv.net.ip = data.ip + ":" + data.port;
        console.log(cc.vv.net.ip);
        var self = this;

        var onConnectOK = function () {
            console.log("onConnectOK");
            cc.vv.wc.hide();
            var sd = {
                userid: cc.vv.userMgr.userId,
                name: cc.vv.userMgr.userName,
                //  header_image: "",
                login_mode: cc.vv.userMgr.login_mode,
                room_conf: cc.vv.userMgr.room_conf,
                room_id: cc.vv.userMgr.roomId,
                header_image: cc.vv.userMgr.header_image,

            };
            cc.vv.net.send("enter_game_room", sd);
        };

        var onConnectFailed = function () {
            console.log("failed.");
            cc.vv.wc.hide();
        };
        cc.vv.wc.show("正在进入房间");
        cc.vv.net.connect(onConnectOK, onConnectFailed);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
