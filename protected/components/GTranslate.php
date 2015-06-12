<?php
//error_reporting(E_ALL);
	class GTranslate{

		public $countWords = 5;


		private function word($text){
			$t = rawurlencode($text);
			$type = '';
			if(count(explode("%20",$t)) > 1){
				$result = file_get_contents("https://translate.google.ru/translate_a/single?client=t&sl=en&tl=ru&hl=uk&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&srcrom=0&ssel=0&tsel=0&kc=1&tk=520684|783087&q=".$t);
				$type = 'multi';
			}else{
				$result = file_get_contents('http://translate.google.ru/translate_a/single?client=t&hl=en&sl=en&tl=ru&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=5&tk=520683|936073&q='.$t.'&dt=bd');
				$type = 'single';
			}
			return [$result,$type];
		}

		private function parseResponseWord($response){
			$resp = $response[0];
		    $resp= str_replace(",,,",",",$resp);
		    $resp= str_replace(",,",",",$resp);
		    $resp= str_replace("[,","[",$resp);
		    $resp= json_decode($resp);
		    /*echo "<pre>";
		    print_r($resp);
		    echo "</pre>";*/
		    if($response[1] == 'single')
		    	return [$resp[0],'single',$this->countWords];
		    else if($response[1] == 'multi'){
		    	if(!is_array($resp[1])){
		    		$arr = [];
		    		foreach($resp[2][0] as $k => $v){
		    			if(is_array($v)){
		    				foreach($v as $k1 => $v1){
			    				$arr[] = $v1[0];
		    				}
		    				break;
		    			}
		    		}
		    		return [$arr,'phrase',$this->countWords];
		    	}else{
		    		return [$resp[1][0][1],'phrase',$this->countWords];
		    	}
			}
		}

		public function trWord($text){
			$resp = $this->word($text);
			return $this->parseResponseWord($resp);
		}
	}