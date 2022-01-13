//【設定】この機能は文字数は8文字まで対象にしている。
//#検索文字を取得する
var keywords = location.search.match(/[?&]q=([^&]*)/);
console.log(keywords[1]);
// 取得したキーワードを文字列に変える
var s = keywords[1].toString()
console.log(s);
// キーワードを分割する
var result = s.split("+",8);
console.log(result);

// 辞書APIに検索した文字をあてる
var url1 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[1] + '?key={api_key}'
fetch(url1)
.then((response) => {
    return response.json()//ここでBodyからJSONを返す
})
.then((result1) => {
    Example(result1);  //取得したJSONデータを関数に渡す 
})
.catch(error => {
    console.log('取得できませんでした', error);
});

// <<<【重要】】>>>ここから下が条件分岐させる//
//条件の分岐させる要素は
//「検索ワード数は何単語か」（2〜8単語）
//「検索ワードの何番目に対義語があるか」

// 【検索ワード 2ワード】検索キーワード2文字目に対義語があった場合
if(result.length == 2){
    //もしも対義語があってもbe動詞の対義語だったら何もしない
    if(result.length===2&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
    function Example(jsonObj){
    // ant とは、辞書から返ってきた対義語のこと
    var ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
    console.log("2単語, 2単語目の対義語は",ant);
    //もしも対義語（ant）があったら
    if(ant.length !== 0){
    //【メイン機能】検索結果の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
    //google検索結果画面のresutl-stats(件数が表示される場所)をid指定して表示する
    　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
    　　//for each文は、対義語が複数あった場合の配列を末尾に一つずつ追加していくためのループ
    　　　ant.forEach( function( item ) {
            console.log(item);
                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}'>${item}</a>,`)
         })   
    }
    }
    }
    }////【検索ワード 3単語】検索キーワード数が3単語の場合。lengthは配列の数（ワード数）を数えている
     else if(result.length == 3){
        function Example(jsonObj){
        ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];//varをとってみた ant は対義語のこと
        console.log(ant);
        //対義語antがあった場合
        if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
            //【メイン機能】検索結果の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
            // ここにget and を入れるかどうか
        　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
        　　　ant.forEach( function( item ) {
                console.log(item);
                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}'>${item}</a>,`)
             })  
　　　　　　　　//【条件分岐】もしも検索キーワード2単語目に対義語がなければ、かつもしbe動詞が2文字に目にあったら、検索キーワード3単語目の対義語を探しにいく
        　　　}else if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
            　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                console.log("検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                //【条件分岐】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                var url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                .then((response) => {
                    return response.json()　//ここでBodyからJSONを返す
                })
                .then((result2) => {
                    Example2(result2);  //取得したJSONデータを関数に渡す 
                })
                .catch((e) => {
                    console.log(e)  //エラーをキャッチし表示     
                })
                function Example2(jsonObj){
                //ant2とは、検索キーワード3文字目の対義語です
                var ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                console.log("3単語、3単語目の対義語は",ant2);
                //もしも検索キーワードの３文字目に対義語があるのなら
                if(ant2.length !== 0){
                //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                    　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                    　　　ant2.forEach( function( item2 ) {
                            console.log(item2);
                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}'>${item2}</a>,`)
                        })   
                }
                } 
                }
            }
    ////【検索ワード 4単語】検索キーワード数が4単語の場合
    }else if(result.length == 4){
    function Example(jsonObj){
    var ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
    console.log("4 words, 2番目の対義語は",ant);
    //もしant検索ワードの2単語目に対義語があったら、そしてbe動詞でなかったら
    if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
    　　console.log("4words, 2単語目に対義語は",ant);
        　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
        　　　ant.forEach( function( item ) {
                console.log(item);
                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}'>${item}</a>,`)
            })
        //【条件分岐】もし検索ワード2番目に対義語がないなら、もしくはbe動詞だったら、3番目の言葉に対義語をとりにいく 
        　　　}if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
            　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                console.log("4単語, 検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                //【条件分岐】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                .then((response) => {
                    return response.json()　//ここでBodyからJSONを返す
                })
                .then((result2) => {
                    Example2(result2);  //取得したJSONデータを関数に渡す 
                })
                .catch((e) => {
                    console.log(e)  //エラーをキャッチし表示     
                })
                function Example2(jsonObj){
                //ant2とは、検索キーワード3文字目の対義語です
                var ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                console.log("4words, 3単語目の対義語は",ant2);
                //もしも検索キーワードの3文字目に対義語があるのなら//かつbe動詞でないなら
                if(ant2 !== undefined&&result[2]!=="is"&&result[2]!=="was"&&result[2]!=="are"&&result[2]!=="were"&&result[2]!=="am"){
                console.log("4単語。検索キーワードの3文字目に対義語は",ant2)
                //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                    　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                    　　　ant2.forEach( function( item2 ) {
                            console.log(item2);
                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}+${result[3]}'>${item2}</a>,`)
                        })
    
                //【条件分岐】もしも検索ワード2文字目にも３文字目にも対義語がなかったら（antが0、ant2が0だったら）、検索キーワードの4番目の対義語(ant3)を探しにいく
                    }if(ant2==undefined||result[2]==="is"||result[2]==="was"||result[2]==="are"||result[2]==="were"||result[2]==="am"){
                            //検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう
                            console.log("検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう");
                            //【条件分岐１】もしも検索キーワード2文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                            var url3 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[3] + '?key={api_key}'
                            fetch(url3) //その場合は検索キーワードの4つ目の対義語を探しにいく
                            .then((response) => {
                                return response.json()　//ここでBodyからJSONを返す
                            })
                            .then((result3) => {
                                Example3(result3);  //取得したJSONデータを関数に渡す 
                            })
                            .catch((e) => {
                                console.log(e) 
                                console.log("error"); //エラーをキャッチし表示     
                            })
                            function Example3(jsonObj){
                            //ant3とは、検索キーワード4文字目の対義語です
                            var ant3 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                            console.log("4単語、検索キーワード4単語目の対義語は",ant3);
                            //もしも検索キーワードの4文字目に対義語があるのなら
                            if(ant3!==undefined){
                            console.log("4単語、検索ワード4単語目の対義語は",ant3)
    　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                　　　ant3.forEach( function( item3 ) {
                                        console.log(item3);
                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${item3}'>${item3}</a>,`)
                                    })   
    　　　　　　　 　　　　　}         　
    　　　　　　　　　　　　    }
                            }}
                }
            }//上のelseif

    ////【検索ワードが5ワード】検索ワード数が5単語の場合
    }else if(result.length == 5){
        //対義語apiから対義語を取得してくる
        function Example(jsonObj){
            ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
            console.log("5単語, 2単語目の対義語は",ant);
            //もしant（検索ワードの2単語目に対義語があったら）
            if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
            　　console.log("5単語, 2単語目の対義語は",ant);
                　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                　　　ant.forEach( function( item ) {
                        console.log(item);
                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}'>${item}</a>,`)
                    })
                //【条件分岐】もし検索ワード2番目に対義語がないなら、3番目の言葉に対義語をとりにいく 
                　　　}if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
                    　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                        console.log("5単語, 検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                        //【条件分岐3】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                        url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                        fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                        .then((response) => {
                            return response.json()　//ここでBodyからJSONを返す
                        })
                        .then((result2) => {
                            Example2(result2);  //取得したJSONデータを関数に渡す 
                        })
                        .catch((e) => {
                            console.log(e)  //エラーをキャッチし表示     
                        })
                        function Example2(jsonObj){
                        //ant2とは、検索キーワード3文字目の対義語です
                        ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                        console.log("5単語。3単語目の対義語は",ant2);
                        //もしも検索キーワードの3文字目に対義語があるのなら
                        if(ant2 !== undefined&&result[2]!=="is"&&result[2]!=="was"&&result[2]!=="are"&&result[2]!=="were"&&result[2]!=="am"){
                        console.log("5単語。検索キーワードの3文字目に対義語あり",ant2)
                        //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                            　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                            　　　ant2.forEach( function( item2 ) {
                                    //item 
                                    console.log(item2);
                                        document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}+${result[3]}+${result[4]}'>${item2}</a>,`)
                                })
            
                        //【条件分岐3】もしも検索ワード2文字目にも3文字目にも対義語がなかったら（antが0、ant2が0だったら）検索キーワードの4番目の対義語(ant3)を探しにいく
                            }if(ant2==undefined||result[2]==="is"||result[2]==="was"||result[2]==="are"||result[2]==="were"||result[2]==="am"){
                                    //検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう
                                    console.log("5単語, 検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう");
                                    //【条件分岐１】もしも検索キーワード2文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                                    var url3 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[3] + '?key={api_key}'
                                    fetch(url3) //その場合は検索キーワードの4つ目の対義語を探しにいく
                                    .then((response) => {
                                        return response.json()　//ここでBodyからJSONを返す
                                    })
                                    .then((result3) => {
                                        Example3(result3);  //取得したJSONデータを関数に渡す 
                                    })
                                    .catch((e) => {
                                        console.log(e)  //エラーをキャッチし表示     
                                    })
                                    function Example3(jsonObj){
                                    //ant3とは、検索キーワード4文字目の対義語です
                                    var ant3 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                    console.log("4文字目の対義語は",ant3);
                                    //もしも検索キーワードの4文字目に対義語があるのなら
                                    if(ant3!==undefined&&result[3]!=="is"&&result[3]!=="was"&&result[3]!=="are"&&result[3]!=="were"&&result[3]!=="am"){
                                    console.log("5words, 4文字目の対義語は",ant3)
            　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                        　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                        　　　ant3.forEach( function( item3 ) {
                                                console.log(item3);
                                                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${item3}+${result[4]}'>${item3}</a>,`)
                                            })
                                    //【条件分岐】検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant3)を探しにいこう
                                        }if(ant3==undefined||result[3]==="is"||result[3]==="was"||result[3]==="are"||result[3]==="were"||result[3]==="am"){
                                                //検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant3)を探しにいこう
                                                console.log("検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant3)を探しにいこう");
                                                //【条件分岐１】もしも検索キーワード２文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                                                var url4 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[4] + '?key={api_key}'
                                                fetch(url4) //その場合は検索キーワードの5つ目の対義語を探しにいく
                                                .then((response) => {
                                                    return response.json()　//ここでBodyからJSONを返す
                                                })
                                                .then((result4) => {
                                                    Example4(result4);  //取得したJSONデータを関数に渡す 
                                                })
                                                .catch((e) => {
                                                    console.log(e)  //エラーをキャッチし表示     
                                                })
                                                function Example4(jsonObj){
                                                //ant4とは、検索キーワード5文字目の対義語です
                                                var ant4 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                console.log("5単語, 5単語目の対義語は",ant4);
                                                //もしも検索キーワードの5文字目に対義語があるのなら
                                                if(ant4!==undefined){
                                                console.log("5単語, 5単語目の対義語は",ant4)
                        　　　　　　　　　　　　　　　//【メイン機能】検索ワードの5単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                    　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                    　　　ant4.forEach( function( item4 ) {
                                                            console.log(item4);
                                                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${item4}'>${item4}</a>,`)
                                                         })　　　　　　　　　    
                                                }
                                                }
                                        }
                                    }
                            }
                        }                        

        }
    }

    ////【検索ワードが6ワード】検索キーワード数が6単語の場合
    }else if(result.length == 6){
       //対義語apiから対義語を取得してくる
        function Example(jsonObj){
        ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
        console.log("6単語, 2番目の対義語は",ant);
        //もしant（検索ワードの2単語目に対義語があったら）
        if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
        　　console.log("6words, 2単語目に対義語あり");
            　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
            　　　ant.forEach( function( item ) {
                    console.log(item);
                        document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}+${result[5]}'>${item}</a>,`)
                })
            //【条件分岐1】もし検索ワード2番目に対義語がないなら、3番目の言葉に対義語をとりにいく 
            　　　}if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
                　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                    console.log("6単語, 検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                    //【条件分岐3】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                    url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                    fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                    .then((response) => {
                        return response.json()　//ここでBodyからJSONを返す
                    })
                    .then((result2) => {
                        Example2(result2);  //取得したJSONデータを関数に渡す 
                    })
                    .catch((e) => {
                        console.log(e)  //エラーをキャッチし表示     
                    })
                    function Example2(jsonObj){
                    //ant2とは、検索キーワード３文字目の対義語です
                    ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                    console.log("検索ワード2単語目に対義語はないから3単語目にとりにいこう",ant2);
                    //もしも検索キーワードの３文字目に対義語があるのなら
                    if(ant2 !== undefined&&result[2]!=="is"&&result[2]!=="was"&&result[2]!=="are"&&result[2]!=="were"&&result[2]!=="am"){
                    console.log("検索キーワードの3文字目の対義語は",ant2)
                    //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                        　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                        　　　ant2.forEach( function( item2 ) {
                                //item 
                                console.log("ant2 of word3 is", item2);
                                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}+${result[3]}+${result[4]}+${result[5]}'>${item2}</a>,`)
                            })
                    //【条件分岐】もしも検索ワード2文字目にも3文字目にも対義語がなかったら（antが0、ant2が0だったら）検索キーワードの4番目の対義語(ant3)を探しにいく
                        }if(ant2==undefined||result[2]==="is"||result[2]==="was"||result[2]==="are"||result[2]==="were"||result[2]==="am"){
                                //検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう
                                console.log("6単語, 2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう");
                                //【条件分岐】もしも検索キーワード2文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                                var url3 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[3] + '?key={api_key}'
                                fetch(url3) //その場合は検索キーワードの4つ目の対義語を探しにいく
                                .then((response) => {
                                    return response.json()　//ここでBodyからJSONを返す
                                })
                                .then((result3) => {
                                    Example3(result3);  //取得したJSONデータを関数に渡す 
                                })
                                .catch((e) => {
                                    console.log(e)  //エラーをキャッチし表示     
                                })
                                function Example3(jsonObj){
                                //ant3とは、検索キーワード4文字目の対義語です
                                var ant3 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                console.log("6単語 4単語目の対義語は",ant3);
                                //もしも検索キーワードの4文字目に対義語があるのなら
                                if(ant3!==undefined&&result[3]!=="is"&&result[3]!=="was"&&result[3]!=="are"&&result[3]!=="were"&&result[3]!=="am"){
                                console.log("6単語 4単語目の対義語は",ant3)
        　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                    　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                    　　　ant3.forEach( function( item3 ) {
                                            console.log(item3);
                                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${item3}+${result[4]}+${result[5]}'>${item3}</a>,`)
                                        })
                                //【条件分岐】検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                    }if(ant3==undefined||result[3]==="is"||result[3]==="was"||result[3]==="are"||result[3]==="were"||result[3]==="am"){
                                            //検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                            console.log("6単語 検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう");
                                            //【条件分岐】もしも検索キーワード2,3,4文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの5番目の対義語を探しにいく
                                            var url4 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[4] + '?key={api_key}'
                                            fetch(url4) //その場合は検索キーワードの5つ目の対義語を探しにいく
                                            .then((response) => {
                                                return response.json()　//ここでBodyからJSONを返す
                                            })
                                            .then((result4) => {
                                                Example4(result4);  //取得したJSONデータを関数に渡す 
                                            })
                                            .catch((e) => {
                                                console.log(e)  //エラーをキャッチし表示     
                                            })
                                            function Example4(jsonObj){
                                            //ant4とは、検索キーワード5文字目の対義語です
                                            var ant4 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                            console.log("6words, 5文字目の対義語は",ant4);
                                            //もしも検索キーワードの4文字目に対義語があるのなら//be動詞でもないなら
                                            if(ant4!==undefined&&result[4]!=="is"&&result[4]!=="was"&&result[4]!=="are"&&result[4]!=="were"&&result[4]!=="am"){
                                            console.log("6words, 5文字目の対義語は",ant4)
                    　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                　　　ant4.forEach( function( item4 ) {
                                                        console.log(item4);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${item4}+${result[5]}'>${item4}</a>,`)
                                                     })　　　　　　　　　    
                                                
                                                
                                            //【条件分岐】//検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                }if(ant4==undefined||result[4]==="is"||result[4]==="was"||result[4]==="are"||result[4]==="were"||result[4]==="am"){
                                                    //検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                console.log("6words, 検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう");
                                             //【条件分岐】もしも検索キーワード2,3,4,5文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの6番目の対義語を探しにいく
                                                var url5 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[5] + '?key={api_key}'
                                                fetch(url5) //その場合は検索キーワードの3つ目の対義語を探しにいく
                                                    .then((response) => {
                                                    return response.json()　//ここでBodyからJSONを返す
                                                    })
                                                    .then((result5) => {
                                                    Example5(result5);  //取得したJSONデータを関数に渡す 
                                                    })
                                                    .catch((e) => {
                                                    console.log(e)  //エラーをキャッチし表示     
                                                    })
                                                    function Example5(jsonObj){
                                                    //ant5とは、検索キーワード6文字目の対義語です
                                                    var ant5 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                    console.log("6words, 6文字目の対義語は",ant5);
                                                    //もしも検索キーワードの6文字目に対義語があるのなら
                                                    if(ant5!==undefined){
                                                    console.log("6words, 6文字目の対義語は",ant5)
                                                    //【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                            document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                            ant5.forEach( function( item5 ) {
                                                            console.log(item5);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${item5}'>${item5}</a>,`)
                                                            })　　　　　　　　　    
                                                    }
                                                    }
                                        }
                                }//上のelseif
                            }}}}}
    }                    
    ////【検索ワードが7ワードの場合】検索キーワード数が7単語の場合
    }else if(result.length == 7){
       //対義語apiから対義語を取得してくる
       function Example(jsonObj){
        ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
        console.log("7単語, 2単語目に対義語は",ant);
        //もしant（検索ワードの2単語目に対義語があったら）
        if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
        　　console.log("7単語, 2単語目に対義語は",ant);
            　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
            　　　ant.forEach( function( item ) {
                    console.log(item);
                        document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${result[6]}'>${item}</a>,`)
                })
            //【条件分岐1】もし検索ワード2番目に対義語がないなら、3番目の言葉に対義語をとりにいく 
            　　　}if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
                　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                    console.log("7単語, 検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                    //【条件分岐3】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                    url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                    fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                    .then((response) => {
                        return response.json()　//ここでBodyからJSONを返す
                    })
                    .then((result2) => {
                        Example2(result2);  //取得したJSONデータを関数に渡す 
                    })
                    .catch((e) => {
                        console.log(e)  //エラーをキャッチし表示     
                    })
                    function Example2(jsonObj){
                    //ant2とは、検索キーワード３文字目の対義語です
                    ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                    console.log("7単語, 3単語目の対義語は",ant2);
                    //もしも検索キーワードの3文字目に対義語があるのなら
                    if(ant2 !== undefined&&result[2]!=="is"&&result[2]!=="was"&&result[2]!=="are"&&result[2]!=="were"&&result[2]!=="am"){
                    console.log("7単語、検索ワードの3文字目に対義語は",ant2)
                    //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                        　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                        　　　ant2.forEach( function( item2 ) {
                                //item 
                                console.log("ant2 of word3 is", item2);
                                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}+${result[3]}+${result[4]}+${result[5]}+${result[6]}'>${item2}</a>,`)
                            })
                    //【条件分岐3】もしも検索ワード2文字目にも3文字目にも対義語がなかったら（antが0、ant2が0だったら）検索キーワードの4番目の対義語(ant3)を探しにいく
                        }if(ant2==undefined||result[2]==="is"||result[2]==="was"||result[2]==="are"||result[2]==="were"||result[2]==="am"){
                                //検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう
                                console.log("7words, 検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう");
                                //【条件分岐１】もしも検索キーワード2文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                                var url3 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[3] + '?key={api_key}'
                                fetch(url3) //その場合は検索キーワードの4つ目の対義語を探しにいく
                                .then((response) => {
                                    return response.json()　//ここでBodyからJSONを返す
                                })
                                .then((result3) => {
                                    Example3(result3);  //取得したJSONデータを関数に渡す 
                                })
                                .catch((e) => {
                                    console.log(e)  //エラーをキャッチし表示     
                                })
                                function Example3(jsonObj){
                                //ant3とは、検索キーワード4文字目の対義語です
                                var ant3 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                console.log("7単語、4単語目の対義語は",ant3);
                                //もしも検索キーワードの4文字目に対義語があるのなら
                                if(ant3!==undefined&&result[3]!=="is"&&result[3]!=="was"&&result[3]!=="are"&&result[3]!=="were"&&result[3]!=="am"){
                                console.log("7words, 4単語目の対義語は",ant3)
        　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                    　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                    　　　ant3.forEach( function( item3 ) {
                                            console.log(item3);
                                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${item3}+${result[4]}+${result[5]}+${result[6]}'>${item3}</a>,`)
                                        })
                                //【条件分岐】検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                    }if(ant3==undefined||result[3]==="is"||result[3]==="was"||result[3]==="are"||result[3]==="were"||result[3]==="am"){
                                            //検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                            console.log("7words, 検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう");
                                            //【条件分岐１】もしも検索キーワード2,3,4文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの5番目の対義語を探しにいく
                                            var url4 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[4] + '?key={api_key}'
                                            fetch(url4) //その場合は検索キーワードの5つ目の対義語を探しにいく
                                            .then((response) => {
                                                return response.json()　//ここでBodyからJSONを返す
                                            })
                                            .then((result4) => {
                                                Example4(result4);  //取得したJSONデータを関数に渡す 
                                            })
                                            .catch((e) => {
                                                console.log(e)  //エラーをキャッチし表示     
                                            })
                                            function Example4(jsonObj){
                                            //ant4とは、検索キーワード5文字目の対義語です
                                            var ant4 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                            console.log("7words, 5単語目の対義語は",ant4);
                                            //もしも検索キーワードの4文字目に対義語があるのなら
                                            if(ant4!==undefined&&result[4]!=="is"&&result[4]!=="was"&&result[4]!=="are"&&result[4]!=="were"&&result[4]!=="am"){
                                            console.log("7words, 5単語目の対義語",ant4)
                    　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                　　　ant4.forEach( function( item4 ) {
                                                        console.log(item4);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${item4}+${result[5]}+${result[6]}'>${item4}</a>,`)
                                                     })　　　　　　　　　    
                                                
                                                
                                            //【条件分岐】//検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                }if(ant4==undefined||result[4]==="is"||result[4]==="was"||result[4]==="are"||result[4]==="were"||result[4]==="am"){
                                                    //検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                console.log("7words, 検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう");
                                             //【条件分岐１】もしも検索キーワード2,3,4,5文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの6番目の対義語を探しにいく
                                                var url5 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[5] + '?key={api_key}'
                                                fetch(url5) //その場合は検索キーワードの6つ目の対義語を探しにいく
                                                    .then((response) => {
                                                    return response.json()　//ここでBodyからJSONを返す
                                                    })
                                                    .then((result5) => {
                                                    Example5(result5);  //取得したJSONデータを関数に渡す 
                                                    })
                                                    .catch((e) => {
                                                    console.log(e)  //エラーをキャッチし表示     
                                                    })
                                                    function Example5(jsonObj){
                                                    //ant5とは、検索キーワード6文字目の対義語です
                                                    var ant5 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                    console.log("7words, 6単語目の対義語は",ant5);
                                                    //もしも検索キーワードの5文字目に対義語があるのなら
                                                    if(ant5!==undefined&&result[5]!=="is"&&result[5]!=="was"&&result[5]!=="are"&&result[5]!=="were"&&result[5]!=="am"){
                                                    console.log("7words, 6番目の対義語は",ant5)
                                                    //【メイン機能】検索ワードの6単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                            document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                            ant5.forEach( function( item5 ) {
                                                            console.log(item5);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${item5}+${result[6]}'>${item5}</a>,`)
                                                            })　　　　　　　　　    
                                                       }if(ant5==undefined||result[5]==="is"||result[5]==="was"||result[5]==="are"||result[5]==="were"||result[5]==="am"){
                                                        //検索ワード2,3,4,5,6文字目に対義語がないから、検索ワードの7番目の対義語(ant6)を探しにいこう
                                                            console.log("7words, 検索ワード2,3,4,5,6文字目に対義語がないから、検索ワードの7番目の対義語(ant6)を探しにいこう");
                                                        //【条件分岐１】もしも検索キーワード2,3,4,5,6文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの7番目の対義語を探しにいく
                                                        var url6 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[6] + '?key={api_key}'
                                                        fetch(url6) //その場合は検索キーワードの7つ目の対義語を探しにいく
                                                        .then((response) => {
                                                        return response.json()　//ここでBodyからJSONを返す
                                                        })
                                                        .then((result6) => {
                                                        Example6(result6);  //取得したJSONデータを関数に渡す 
                                                        })
                                                        .catch((e) => {
                                                        console.log(e)  //エラーをキャッチし表示     
                                                        })
                                                        function Example6(jsonObj){
                                                        //ant6とは、検索キーワード7文字目の対義語です
                                                        var ant6 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                        console.log("7words, 7単語目の対義語は is",ant6);
                                                        //もしも検索キーワードの7文字目に対義語があるのなら
                                                        if(ant6!==undefined){
                                                        console.log("7words, 7単語目の対義語は",ant6)
                                                        //【メイン機能】検索ワードの7単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                        document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                        ant6.forEach( function( item6 ) {
                                                        console.log(item6);
                                                        document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${item6}'>${item6}</a>,`)
                                                                    })　　　　　　　　　    
                                                        }
                                                        }
                                                        }
                                                }
                                                }
                                            }//上のelseif
                            }}}}
            }
    }

    ////【検索ワードが8ワード】検索キーワード数が8単語の場合
    }else if(result.length == 8){
       //対義語apiから対義語を取得してくる
       function Example(jsonObj){
        ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
        console.log("8単語, 2単語目の対義語は",ant);
        //もしant（検索ワードの2単語目に対義語があったら）
        if(ant !== undefined&&result[1]!=="is"&&result[1]!=="was"&&result[1]!=="are"&&result[1]!=="were"&&result[1]!=="am"){
        　　console.log("8単語, 2単語目に対義語は",ant);
            　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
            　　　ant.forEach( function( item ) {
                    console.log(item);
                        document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${result[6]}+${result[7]}'>${item}</a>,`)
                })
            //【条件分岐1】もし検索ワード2番目に対義語がないなら、3番目の言葉に対義語をとりにいく 
            　　　}if(ant==undefined||result[1]==="is"||result[1]==="was"||result[1]==="are"||result[1]==="were"||result[1]==="am"){
                　　　//”検索ワード2単語目に対義語はないから3単語目にとりにいこう”
                    console.log("8単語, 検索ワード2単語目に対義語はないから3単語目にとりにいこう");
                    //【条件分岐3】もしも検索キーワード2文字目の対義語がなかったら（antが0だったら）、検索キーワードの3番目の対義語を探しにいく
                    url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'
                    fetch(url2) //その場合は検索キーワードの3つ目の対義語を探しにいく
                    .then((response) => {
                        return response.json()　//ここでBodyからJSONを返す
                    })
                    .then((result2) => {
                        Example2(result2);  //取得したJSONデータを関数に渡す 
                    })
                    .catch((e) => {
                        console.log(e)  //エラーをキャッチし表示     
                    })
                    function Example2(jsonObj){
                    //ant2とは、検索キーワード３文字目の対義語です
                    ant2 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                    console.log("8単語, 3単語目の対義語は",ant2);
                    //もしも検索キーワードの３文字目に対義語があるのなら
                    if(ant2 !== undefined&&result[2]!=="is"&&result[2]!=="was"&&result[2]!=="are"&&result[2]!=="were"&&result[2]!=="am"){
                    console.log("8単語、検索キーワードの3文字目に対義語あり",ant2)
                    //【メイン機能】検索ワードの3単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                        　　 document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                        　　　ant2.forEach( function( item2 ) {
                                //item 
                                console.log(item2);
                                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${item2}+${result[3]}+${result[4]}+${result[5]}+${result[6]}+${result[7]}'>${item2}</a>,`)
                            })
                    //【条件分岐3】もしも検索ワード2文字目にも3文字目にも対義語がなかったら（antが0、ant2が0だったら）検索キーワードの4番目の対義語(ant3)を探しにいく
                        }if(ant2==undefined||result[2]==="is"||result[2]==="was"||result[2]==="are"||result[2]==="were"||result[2]==="am"){
                                //検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語(ant3)を探しにいこう
                                console.log("8単語, 検索ワード2文字目,３文字目に対義語がないから、検索ワードの4番目の対義語を探しにいこう");
                                //【条件分岐１】もしも検索キーワード2文字目、3文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの4番目の対義語を探しにいく
                                var url3 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[3] + '?key={api_key}'
                                fetch(url3) //その場合は検索キーワードの3つ目の対義語を探しにいく
                                .then((response) => {
                                    return response.json()　//ここでBodyからJSONを返す
                                })
                                .then((result3) => {
                                    Example3(result3);  //取得したJSONデータを関数に渡す 
                                })
                                .catch((e) => {
                                    console.log(e)  //エラーをキャッチし表示     
                                })
                                function Example3(jsonObj){
                                //ant3とは、検索キーワード4文字目の対義語です
                                var ant3 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                console.log("8単語、4単語目の対義語は",ant3);
                                //もしも検索キーワードの4文字目に対義語があるのなら
                                if(ant3!==undefined&&result[3]!=="is"&&result[3]!=="was"&&result[3]!=="are"&&result[3]!=="were"&&result[3]!=="am"){
                                console.log("8単語, 4単語目の対義語は",ant3)
        　　　　　　　　　　　　　　　//【メイン機能】検索ワードの4単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                    　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                    　　　ant3.forEach( function( item3 ) {
                                            console.log(item3);
                                                document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${item3}+${result[4]}+${result[5]}+${result[6]}+${result[7]}'>${item3}</a>,`)
                                        })
                                //【条件分岐】検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                    }if(ant3==undefined||result[3]==="is"||result[3]==="was"||result[3]==="are"||result[3]==="were"||result[3]==="am"){
                                            //検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう
                                            console.log("8単語, 検索ワード2,3,4文字目に対義語がないから、検索ワードの5番目の対義語(ant4)を探しにいこう");
                                            //【条件分岐】もしも検索キーワード2,3,4文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの5番目の対義語を探しにいく
                                            var url4 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[4] + '?key={api_key}'
                                            fetch(url4) //その場合は検索キーワードの5つ目の対義語を探しにいく
                                            .then((response) => {
                                                return response.json()　//ここでBodyからJSONを返す
                                            })
                                            .then((result4) => {
                                                Example4(result4);  //取得したJSONデータを関数に渡す 
                                            })
                                            .catch((e) => {
                                                console.log(e)  //エラーをキャッチし表示     
                                            })
                                            function Example4(jsonObj){
                                            //ant4とは、検索キーワード5文字目の対義語です
                                            var ant4 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                            console.log("8単語, 5単語目の対義語は",ant4);
                                            //もしも検索キーワードの4文字目に対義語があるのなら
                                            if(ant4!==undefined&&result[4]!=="is"&&result[4]!=="was"&&result[4]!=="are"&&result[4]!=="were"&&result[4]!=="am"){
                                            console.log("8単語, 5単語目の対義語は",ant4)
                    　　　　　　　　　　　　　　　//【メイン機能】検索ワードの5単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                　　　ant4.forEach( function( item4 ) {
                                                        console.log(item4);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${item4}+${result[5]}+${result[6]}+${result[7]}'>${item4}</a>,`)
                                                     })　　　　　　　　　       
                                            //【条件分岐】//検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                }if(ant4==undefined||result[4]==="is"||result[4]==="was"||result[4]==="are"||result[4]==="were"||result[4]==="am"){
                                                    //検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう
                                                console.log("8words, 検索ワード2,3,4,5文字目に対義語がないから、検索ワードの6番目の対義語(ant5)を探しにいこう");
                                             //【条件分岐】もしも検索キーワード2,3,4,5文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの6番目の対義語を探しにいく
                                                var url5 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[5] + '?key={api_key}'
                                                fetch(url5) //その場合は検索キーワードの6つ目の対義語を探しにいく
                                                    .then((response) => {
                                                    return response.json()　//ここでBodyからJSONを返す
                                                    })
                                                    .then((result5) => {
                                                    Example5(result5);  //取得したJSONデータを関数に渡す 
                                                    })
                                                    .catch((e) => {
                                                    console.log(e)  //エラーをキャッチし表示     
                                                    })
                                                    function Example5(jsonObj){
                                                    //ant5とは、検索キーワード6文字目の対義語です
                                                    var ant5 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                    console.log("8単語, 6単語目の対義語は",ant5);
                                                    //もしも検索キーワードの6文字目に対義語があるのなら//be動詞でもないなら
                                                    if(ant5!==undefined&&result[5]!=="is"&&result[5]!=="was"&&result[5]!=="are"&&result[5]!=="were"&&result[5]!=="am"){
                                                    console.log("8単語, 6単語目の対義語は",ant5)
                                                    //【メイン機能】検索ワードの6単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                            document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                            ant5.forEach( function( item5 ) {
                                                            console.log(item5);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${item5}+${result[6]}+${result[7]}'>${item5}</a>,`)
                                                            })　　　　　　　　　    
                                                        //
                                                       }if(ant5==undefined||result[5]==="is"||result[5]==="was"||result[5]==="are"||result[5]==="were"||result[5]==="am"){
                                                        //検索ワード2,3,4,5,6文字目に対義語がないからあるいはbe動詞だから、検索ワードの7番目の対義語(ant6)を探しにいこう
                                                            console.log("8単語,2,3,4,5,6文字目に対義語がないからあるいはbe動詞だから、検索ワードの7番目の対義語(ant6)を探しにいこう");
                                                        //【条件分岐】もしも検索キーワード2,3,4,5,6文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの7番目の対義語を探しにいく
                                                        var url6 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[6] + '?key={api_key}'
                                                        fetch(url6) //その場合は検索キーワードの7つ目の対義語を探しにいく
                                                        .then((response) => {
                                                        return response.json()　//ここでBodyからJSONを返す
                                                        })
                                                        .then((result6) => {
                                                        Example6(result6);  //取得したJSONデータを関数に渡す 
                                                        })
                                                        .catch((e) => {
                                                        console.log(e)  //エラーをキャッチし表示     
                                                        })
                                                        function Example6(jsonObj){
                                                        //ant6とは、検索キーワード7文字目の対義語です
                                                        var ant6 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                        console.log("8単語, 7単語目の対義語は",ant6);
                                                        //もしも検索キーワードの7文字目に対義語があるのなら
                                                            if(ant6!==undefined&&result[6]!=="is"&&result[6]!=="was"&&result[6]!=="are"&&result[6]!=="were"&&result[6]!=="am"){
                                                            console.log("8単語, 7単語目の対義語は",ant6)
                                                            //【メイン機能】検索ワードの7単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                            document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                            ant6.forEach( function( item6 ) {
                                                            console.log(item6);
                                                            document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${item6}+${result[7]}'>${item6}</a>,`)
                                                                        })　　　　　　　　　    
                                                                }if(ant6==undefined||result[6]==="is"||result[6]==="was"||result[6]==="are"||result[6]==="were"||result[6]==="am"){
                                                                //検索ワード2,3,4,5,6文字目に対義語がないから、検索ワードの7番目の対義語(ant6)を探しにいこう
                                                                console.log("8words, No ant,ant2, ant3, ant4, ant5,ant6, go to ant7");
                                                                //【条件分岐】もしも検索キーワード2,3,4,5,6,7文字目に対義語がなかったら（antとant2が0だったら）、検索キーワードの8番目の対義語を探しにいく
                                                                    var url7 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[7] + '?key={api_key}'
                                                                    fetch(url7) //その場合は検索キーワードの8つ目の対義語を探しにいく
                                                                    .then((response) => {
                                                                    return response.json()　//ここでBodyからJSONを返す
                                                                    })
                                                                    .then((result7) => {
                                                                    Example7(result7);  //取得したJSONデータを関数に渡す 
                                                                    })
                                                                    .catch((e) => {
                                                                    console.log(e)  //エラーをキャッチし表示     
                                                                    })
                                                                    function Example7(jsonObj){
                                                                    //ant4とは、検索キーワード5文字目の対義語です
                                                                    var ant7 = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
                                                                    console.log("8単語, 8単語目の対義語は",ant7);
                                                                    //もしも検索キーワードの8文字目に対義語があるのなら
                                                                    if(ant7!==undefined||result[7]==="is"||result[7]==="was"||result[7]==="are"||result[7]==="were"||result[7]==="am"){
                                                                    console.log("8単語, 8単語目の対義語は",ant7)
                                                                    //【メイン機能】検索ワードの8単語目の対義語を表示する。for each文は、対義語が複数あった場合に末尾に一つずつ追加していくためのループ
                                                                    document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
                                                                    ant7.forEach( function( item7 ) {
                                                                    console.log(item7);
                                                                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${result[1]}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${result[6]}+${item7}'>${item7}</a>,`)
                                                                                })　　　　　　　　　    
                                                                    }
                                                                    }
                                                                    }
                                                            }
                                                            }
                                                    }
                                                    }
                                                }//上のelseif
                                }}}}
                }
        }




////////////////ここまで成功。1.10の午後は成功次は下にいく。あと、対義語のisとareも対象になる問題を検討する




    ///[条件分岐2]検索キーワード数が9単語の場合
    }else if(result.length == 9){
        function Example(jsonObj){
        var ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
        //    var ant2 = jsonObj[0].meta.ants[1];  //ここは復元しないでアウトする
        console.log(ant);
        if(ant.length !== 0){
        //    console.log(ant2);
        
        　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
        　　　ant.forEach( function( item ) {
                console.log(item);
                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${result[6]}+${result[7]}'>${item}</a>&nbsp;`)
            })   
    }}
    ///[条件分岐2]検索キーワード数が10単語の場合
    }else if(result.length == 10){
        function Example(jsonObj){
        var ant = jsonObj[0] && jsonObj[0].meta && jsonObj[0].meta.ants && jsonObj[0].meta.ants[0];
        //    var ant2 = jsonObj[0].meta.ants[1];  //ここは復元しないでアウトする
        console.log(ant);
        if(ant.length !== 0){
        //    console.log(ant2);
        
        　　document.getElementById("result-stats").innerHTML ="<span>Search different one?...</span>";
        　　　ant.forEach( function( item ) {
                console.log(item);
                    document.getElementById("result-stats").insertAdjacentHTML('beforeend',`<a href = 'https://www.google.com/search?q=${result[0]}+${item}+${result[2]}+${result[3]}+${result[4]}+${result[5]}+${result[6]}+${result[7]}+${result[8]}'>${item}</a>&nbsp;`)
            })   
    }}
    //単語数が10文字以上の場合、何もしない
    }else if(result.length > 10){
            ;
    };   

    
//↑【条件分岐２・文字数↑はコピペしてくりかえす】

//url2は、検索キーワードの3文字目をAPIに投げる
// const url2 = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + result[2] + '?key={api_key}'









// ーーーーここから下は古いコード＝＝＝＝＝



    
       

