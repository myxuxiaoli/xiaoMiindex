// 顶部

$(function () {
    // 购物车的鼠标移入、移出事件：
    $('#cart').mouseenter(function () {
        $('.cart-list').show();
    });
    $('#cart').mouseleave(function () {
        $('.cart-list').hide();
    });
    // 顶部导航栏右侧搜索框部分
    $('.search-ipt').focus(function () {
        $('.header-search').css({
            'border': '1px solid red'
        });
        $('.search-btn').css({
            'border-left': '1px solid red'
        });
        $('.hot-word').hide();
        $('.search-result').slideDown();
    })
    $('.search-ipt').blur(function () {
        $('.header-search').css({
            'border': '1px solid #ccc'
        });
        $('.search-btn').css({
            'border-left': '1px solid #ccc'
        });
        $('.hot-word').show();
        $('.search-result').hide();
    })

    // 调用顶部导航栏的下拉列表函数
    nav();
    // 调用轮播图部分左边导航栏请求函数
    sideLeft();
    // 调用轮播图函数
    slide();
    //智能硬件部分函数调用 
    goods();
    // 调用搭配部分左边的数据请求函数
    goodsLeft();
    goodsLeft2();
    goodsLeft3();
    // 调用搭配部分右边栏的数据请求函数
    goodsRight();
    goodsRight2();
    goodsRight3();

    // 调用推荐部分数据请求函数
    recommend();

    // 调用热评部分数据请求函数
    comment();
    //调用视频部分数据请求函数
    video();
    //调用内容部分数据请求函数
    content();


    // 顶部导航栏的下拉列表函数
    function nav() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/nav',
            dataType: 'json',
            success: function (data) {
                var obj = {
                    items: data
                }
                var str = template("tp1", obj);
                $("#navs").html(str);
                var lis = document.querySelectorAll("#navs li");
                for (var i = 0; i < 7; i++) {
                    $(lis[i]).hover(function () {
                        var key = this.type;
                        $.ajax({
                            url: 'http://192.168.70.40:9900/api/nav',
                            dataType: 'json',
                            data: { type: key },
                            success: function (data) {
                                var obj2 = {
                                    items: data
                                }
                                var str2 = template("tp2", obj2);
                                // console.log(str2);
                                $('#menus').html(str2);
                            }
                        })
                        $('#header-menu').stop().slideDown();
                    }, function () {
                        $('#header-menu').stop().slideUp();
                    });
                    $('#header-menu').hover(function () {
                        $('#header-menu').stop().slideDown();
                    }, function () {
                        $('#header-menu').stop().slideUp();
                    })
                }
            },
        })
    }
    // 轮播图部分左边导航栏请求函数
    function sideLeft() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/items',
            dataType: 'json',
            data: {
                id: 1
            },
            success: function (data) {
                // console.log(data);
                var obj3 = {
                    sideItems: data
                }
                // console.log(data[1].type);
                var str3 = template("tp3", obj3);
                $("#side-left").html(str3);
                setLi(1);
                setLi(2);
                setLi(3);
                setLi(4);
                setLi(5);
                setLi(6);
                setLi(6);
                setLi(7);
                setLi(8);
                setLi(9);
                setLi(10);
                function setLi(i) {
                    var dataArr = ['phones', 'computer', 'box', 'router', 'power', 'headset', 'foil', 'line', 'bags', 'rabbit'];
                    var li = document.querySelector("#side-left li:nth-child(" + i + ")");
                    $(li).mouseover(function () {
                        $('.site-category-detail').show();
                        $.ajax({
                            url: 'http://192.168.70.40:9900/api/items',
                            dataType: 'json',
                            data: {
                                type: dataArr[i - 1]
                            },
                            success: function (data) {
                                // console.log(data);
                                var obj4 = {
                                    goods: data
                                }
                                var str4 = template("tp4", obj4);
                                $('#category-items').html(str4);
                                var lis = document.querySelectorAll('#category-items li');
                                if (lis.length <= 6) {
                                    $('#category-items').css({
                                        'width': '265px'
                                    });
                                }
                                if (lis.length > 6) {
                                    $('#category-items').css({
                                        'width': '530px'
                                    });
                                }
                                if (lis.length > 12) {
                                    $('#category-items').css({
                                        'width': '795px'
                                    });
                                }
                            }
                        })
                    }).mouseout(function () {
                        $('.site-category-detail').hide();
                    })
                }
            }
        })
    }

    // 轮播图数据请求函数
    function slide() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/lunbo',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj5 = {
                    slide: data
                }
                var str5 = template("tp5", obj5);
                // console.log(str5);
                $('.swiper-wrapper').html(str5);
            }
        })
    }

    // 智能硬件部分数据请求
    function goods() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/hardware',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj6 = {
                    boxLi: data
                }
                var str6 = template("tp6", obj6);
                // console.log(str6);
                $('#box-list').append(str6);
            }

        })
    }

    // 搭配部分左边的数据请求函数
    function goodsLeft() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'match'
            },
            dataType: 'json',
            success: function (data) {
                var obj = {
                    goods: data.leftGoods
                }
                // console.log(obj);
                var str = template('tpgoods', obj);
                $('#goods-left').html(str);
            }
        })
    }

    // 配件部分左边栏请求数据函数
    function goodsLeft2() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'accessories'
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj = {
                    goods2: data.leftGoods
                }
                // console.log(obj);
                var str = template('tpgoods2', obj);
                $('#goods-left2').html(str);
            }
        })
    }

    // 周边部分左边栏请求数据
    function goodsLeft3() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'around'
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj = {
                    goods3: data.leftGoods
                }
                // console.log(obj);
                var str = template('tpgoods3', obj);
                $('#goods-left3').html(str);
            }
        })
    }

    // 周边部分右边栏请求数据函数
    function goodsRight3() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'around'
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var obj = {
                    li: data.subs
                };
                // console.log(obj);
                var str = template('tpLi3', obj);
                $('#topSub3').html(str);
                $('#topSub3 li:nth-child(1)').addClass('active');
                // 热门部分
                $.ajax({
                    url: 'http://192.168.70.40:9900/api/product',
                    dataType: 'json',
                    data: {
                        toptitle: 'around'
                    },
                    success: function (data) {
                        // console.log(data);
                        var obj1 = {
                            rightgoods3: data.hotcloths
                        }
                        // console.log(obj1);
                        var str1 = template('goodsright3', obj1);
                        $('#rightgoo3').html(str1);

                    }
                });

                var li1 = document.querySelector('#topSub3 li:nth-child(1)');
                li1.onmouseover = function () {
                    $.ajax({
                        url: 'http://192.168.70.40:9900/api/product',
                        dataType: 'json',
                        data: {
                            toptitle: 'around'
                        },
                        success: function (data) {
                            // console.log(data);
                            var obj1 = {
                                rightgoods3: data.hotcloths
                            }
                            // console.log(obj1);
                            var str1 = template('goodsright3', obj1);
                            $('#rightgoo3').html(str1);
                        }
                    });
                    $('#topSub3 li').removeClass('active');
                    $(li1).addClass('active');
                }



                //切换
                function goodsLi(i) {
                    var lig = document.querySelector('#topSub3 li:nth-child(' + i + ')');
                    var keyArr = ["clothes", "rabbit", "around", "bags"];
                    lig.onmouseover = function () {
                        $.ajax({
                            url: 'http://192.168.70.40:9900/api/product',
                            dataType: 'json',
                            data: {
                                key: keyArr[i - 2]
                            },
                            success: function (data) {
                                // console.log(data);
                                var obj3 = {
                                    rightgoods: data.datas
                                };
                                var str3 = template('goodsright', obj3);
                                // console.log(str3);
                                $('#rightgoo3').html(str3);
                                $('#topSub3 li').removeClass('active');
                                $(lig).addClass('active');
                            }
                        })
                    }
                }
                goodsLi(2);
                goodsLi(3);
                goodsLi(4);
                goodsLi(5);




            }
        })
    }

    // 配件部分右边栏的数据请求函数
    function goodsRight2() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'accessories'
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var obj = {
                    li: data.subs
                };
                // console.log(obj);
                var str = template('tpLi2', obj);
                $('#topSub2').html(str);
                $('#topSub2 li:nth-child(1)').addClass('active');
                // 热门部分
                $.ajax({
                    url: 'http://192.168.70.40:9900/api/product',
                    dataType: 'json',
                    data: {
                        toptitle: 'accessories'
                    },
                    success: function (data) {
                        // console.log(data);
                        var obj1 = {
                            rightgoods2: data.hot
                        }
                        // console.log(obj1);
                        var str1 = template('goodsright2', obj1);
                        $('#rightgoo2').html(str1);

                    }
                });


                var li1 = document.querySelector('#topSub2 li:nth-child(1)');
                li1.onmouseover = function () {
                    $.ajax({
                        url: 'http://192.168.70.40:9900/api/product',
                        dataType: 'json',
                        data: {
                            toptitle: 'accessories'
                        },
                        success: function (data) {
                            // console.log(data);
                            var obj1 = {
                                rightgoods2: data.hot
                            }
                            // console.log(obj1);
                            var str1 = template('goodsright2', obj1);
                            $('#rightgoo2').html(str1);
                        }
                    });
                    $('#topSub2 li').removeClass('active');
                    $(li1).addClass('active');
                }

                //切换
                function goodsLi(i) {
                    var li = document.querySelector('#topSub2 li:nth-child(' + i + ')');
                    var keyArr = ["protect", "fiol", "other"];
                    li.onmouseover = function () {
                        $.ajax({
                            url: 'http://192.168.70.40:9900/api/product',
                            dataType: 'json',
                            data: {
                                key: keyArr[i - 2]
                            },
                            success: function (data) {
                                console.log(data);
                                var obj3 = {
                                    rightgoods: data.datas
                                };
                                var str3 = template('goodsright', obj3);
                                console.log(str3);
                                $('#rightgoo2').html(str3);
                                $('#topSub2 li').removeClass('active');
                                $(li).addClass('active');
                            }
                        })
                    }
                }
                goodsLi(2);
                goodsLi(3);
                goodsLi(4);


            }
        })
    }

    // 搭配部分右边栏的数据请求函数
    function goodsRight() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/product',
            data: {
                toptitle: 'match'
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj = {
                    li: data.subs
                }
                // console.log(obj[0].key);
                var str = template('tpLi', obj);
                $('#topSub').html(str);
                $('#topSub li:nth-child(1)').addClass('active');
                // 热门部分
                $.ajax({
                    url: 'http://192.168.70.40:9900/api/product',
                    dataType: 'json',
                    data: {
                        toptitle: 'match'
                    },
                    success: function (data) {
                        // console.log(data);
                        var obj1 = {
                            rightgoods: data.hotgoods
                        }
                        // console.log(obj1);
                        var str1 = template('goodsright', obj1);
                        $('#rightgoo').html(str1);
                    }
                });
                var li1 = document.querySelector('#topSub li:nth-child(1)');
                li1.onmouseover = function () {
                    $.ajax({
                        url: 'http://192.168.70.40:9900/api/product',
                        dataType: 'json',
                        data: {
                            toptitle: 'match'
                        },
                        success: function (data) {
                            // console.log(data);
                            var obj1 = {
                                rightgoods: data.hotgoods
                            }
                            // console.log(obj1);
                            var str1 = template('goodsright', obj1);
                            $('#rightgoo').html(str1);
                        }
                    });
                    $('#topSub li').removeClass('active');
                    $(li1).addClass('active');
                }
                //切换
                function goodsLi(i) {
                    var li = document.querySelector('#topSub li:nth-child(' + i + ')');
                    var keyArr = ["headset", "power", "battery"];
                    li.onmouseover = function () {
                        $.ajax({
                            url: 'http://192.168.70.40:9900/api/product',
                            dataType: 'json',
                            data: {
                                key: keyArr[i - 2]
                            },
                            success: function (data) {
                                // console.log(data);
                                var obj3 = {
                                    rightgoods: data.datas
                                };
                                var str3 = template('goodsright', obj3);
                                // console.log(str3);
                                $('#rightgoo').html(str3);
                                $('#topSub li').removeClass('active');
                                $(li).addClass('active');
                            }
                        })
                    }
                }
                goodsLi(2);
                goodsLi(3);
                goodsLi(4);
            }
        })
    }

    // 推荐部分数据请求函数：
    function recommend() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/recommend',
            dataType: 'json',
            data: {
                page: 1
            },
            success: function (data) {
                var obj = {
                    li: data
                };
                var str = template('recommend', obj);
                $('#wrap').html(str);
            }
        });
        var arrLeft = document.getElementById('left');
        var arrRight = document.getElementById('right');
        var index = 1;
        arrRight.onclick = function () {
            index++;
            if (index > 4) {
                index = 1;

            }
            $.ajax({
                url: 'http://192.168.70.40:9900/api/recommend',
                dataType: 'json',
                data: {
                    page: index
                },
                success: function (data) {
                    var obj = {
                        li: data
                    };
                    var str = template('recommend', obj);
                    $('#wrap').html(str);
                }
            });

        };

        arrLeft.onclick = function () {
            index--;
            if (index < 1) {
                index = 4;
            }
            $.ajax({
                url: 'http://192.168.70.40:9900/api/recommend',
                dataType: 'json',
                data: {
                    page: index
                },
                success: function (data) {
                    var obj = {
                        li: data
                    };
                    var str = template('recommend', obj);
                    $('#wrap').html(str);
                }
            });
        }
    }

    // 热评部分数据请求函数
    function comment() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/hotcomment',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj = {
                    commentLi: data
                }
                // console.log(obj);
                var str = template('commentTp', obj);
                // console.log(str);
                $('#commentUl').html(str);
            }
        })

    }
    //视频部分数据请求函数
    function video() {
        $.ajax({
            url: 'http://192.168.70.40:9900/api/video',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var obj = {
                    videoLi: data
                };
                var str = template('videosp', obj);
                $('#videoUl').html(str);
            }

        })
    }

    //内容部分数据请求函数
    function content() {
        $.ajax({
            url: 'http://192.168.70.62:9900/api/content',
            dataType: 'json',
            success: function (data) {
                console.log(data.contents[1]);
                //图书部分
                var obj = {
                    book: data.contents[0].list
                };
                console.log(obj);
                var string = template('booksi', obj);
                console.log(string);
                $('#books').html(string);

                //主题部分

                var obj1 = {
                    theme: data.contents[1].list
                };
                console.log(obj1);
                var string1 = template('themes', obj1);
                console.log(string1);
                $('#theme').html(string1);

                //游戏部分
                var obj2 = {
                    game: data.contents[2].list
                };
                console.log(obj2);
                var string2 = template('gaming', obj2);
                console.log(string2);
                $('#games').html(string2);

                //应用部分
                var obj3 = {
                    app: data.contents[3].list
                };
                console.log(obj3);
                var string3 = template('appss', obj3);
                console.log(string3);
                $('#apps').html(string3);

                //调用book,theme,game,app四个函数
                book();
                theme();
                game();
                app();

                //图书部分轮播图
                function book() {
                    var Left1 = document.getElementById('l1');
                    var Right1 = document.getElementById('r1');
                    var lis1 = document.querySelectorAll('#books li');
                    var spans1 = document.querySelectorAll('.paginations span');
                    var index = 0;
                    Right1.onclick = function () {
                        index++;
                        if (index > 3) {
                            index = 0;
                        }
                        $('#books li').hide();
                        $(lis1[index]).show();
                        $('.book .paginations span').removeClass('active');
                        $(spans1[index]).addClass('active');
                    }
                    Left1.onclick = function () {
                        index--;
                        if (index < 0) {
                            index = 3;
                        }
                        $('#books li').hide();
                        $(lis1[index]).show();
                        $('.book .paginations span').removeClass('active');
                        $(spans1[index]).addClass('active');
                    }
                }

                //主题部分轮播图
                function theme() {
                    var Left2 = document.getElementById('l2');
                    var Right2 = document.getElementById('r2');
                    var lis2 = document.querySelectorAll('#theme li');
                    var spans2 = document.querySelectorAll('.theme .paginations span');
                    var index = 0;
                    Right2.onclick = function () {
                        index++;
                        if (index > 3) {
                            index = 0;
                        }
                        $('#theme li').hide();
                        $(lis2[index]).show();
                        $('.theme .paginations span').removeClass('active');
                        $(spans2[index]).addClass('active');
                    }
                    Left2.onclick = function () {
                        index--;
                        if (index < 0) {
                            index = 3;
                        }
                        $('#theme li').hide();
                        $(lis2[index]).show();
                        $('.theme .paginations span').removeClass('active');
                        $(spans2[index]).addClass('active');
                    }
                }

                //游戏部分轮播图
                function game() {
                    var Left3 = document.getElementById('l3');
                    var Right3 = document.getElementById('r3');
                    var lis3 = document.querySelectorAll('#games li');
                    var spans3 = document.querySelectorAll('.game .paginations span');
                    var index = 0;
                    Right3.onclick = function () {
                        index++;
                        if (index > 3) {
                            index = 0;
                        }
                        $('#games li').hide();
                        $(lis3[index]).show();
                        $('.game .paginations span').removeClass('active');
                        $(spans3[index]).addClass('active');
                    }
                    Left3.onclick = function () {
                        index--;
                        if (index < 0) {
                            index = 3;
                        }
                        $('#games li').hide();
                        $(lis3[index]).show();
                        $('.game .paginations span').removeClass('active');
                        $(spans3[index]).addClass('active');
                    }
                }


                //应用部分轮播图
                function app() {
                    var Left4 = document.getElementById('l4');
                    var Right4 = document.getElementById('r4');
                    var lis4 = document.querySelectorAll('#apps li');
                    var spans4 = document.querySelectorAll('.apps .paginations span');
                    var index = 0;
                    Right4.onclick = function () {
                        index++;
                        if (index > 3) {
                            index = 0;
                        }
                        $('#apps li').hide();
                        $(lis4[index]).show();
                        $('.apps .paginations span').removeClass('active');
                        $(spans4[index]).addClass('active');
                    }
                    Left4.onclick = function () {
                        index--;
                        if (index < 0) {
                            index = 3;
                        }
                        $('#apps li').hide();
                        $(lis4[index]).show();
                        $('.apps .paginations span').removeClass('active');
                        $(spans4[index]).addClass('active');
                    }

                }
            }
        })
    }




})



