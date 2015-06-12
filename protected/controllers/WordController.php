<?php

class WordController extends Controller
{
	public $layout='main';
	public $defaultAction = 'show';

	public function accessRules()
    {
        return array(
            array('deny',
                'actions'=>array(),
                'users'=>array('?'),
            ));
    }

    public function filters()
    {
        return array(
            'accessControl',
        );
    }

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionShow($set)
	{
		if($set == null){
			throw new Exception("Error Processing Request", 1);
		}
		$set_model = Set::model()->findByPk($set);
		//Связь word_bind прописана в BindSetWord это отношение этой таблицы к таблице со словами
		//т.е при работе таблица со словами будет коннектица к этой и выводится в грид
		/*$dataProvider = new CActiveDataProvider('BindSetWord',array(
			'criteria'=>array(
				'with'=>['word_bind'],
				'condition'=>'t.id_set = :idv',
				'params' => array(':idv'=>$set),
		)));*/

		$result1 = Word::model()->findAllByAttributes(['id_set'=>(int)$set]);
		$countRecords = count($result1);
		$data = [];
		foreach ($result1 as $k=> $v){
			$translate = Translate::model()->findAllByAttributes(['id_word'=>$v->id]);
			$data[$v->word] = [];
			foreach ($translate as $key => $value){
				$data[$v->word][] = $value->translate;
			}
		}
		//print_r($data);

		$this->render('show',['set'=>$set_model,'data'=>json_encode($data),'countRecords'=>$countRecords]);
	}

	public function actionGetTranslate($text){
		$tr = new GTranslate();
	    $trw = $tr->trWord($text);
	    die(json_encode($trw));
	}

	public function actionSetTranslate($set,$word,$translate){
		$word = trim($word);
		$translate = trim($translate);
		$word_ex = Word::model()->findByAttributes(['word'=>$word,'id_set'=>(int)$set]);
		if($word_ex != null){
			$trr = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>$word_ex->id,'translate'=>$translate]);
			if($trr == null){
				$tr1 = new Translate;
				$tr1->id_word = $word_ex->id;
				$tr1->translate = $translate;
				$tr1->id_set = (int)$set;
				if(!$tr1->save()){
					throw new Exception("Error Processing Request", 1);
				}
			}else{
				throw new Exception("Error Processing Request", 1);
			}
			die('["ok"]');
		}else{
			$new_word = new Word();
			$new_word->word = $word;
			$new_word->status= 0;
			$new_word->ts = time();
			$new_word->id_set = (int)$set;
			if(!$new_word->save()){
				throw new Exception("Error Processing Request", 1);
			}

			$tr = new Translate();
			$tr->id_word = (int)$new_word->id;
			$tr->translate = $translate;
			$tr->id_set = (int)$set;
			if(!$tr->save()){
				throw new Exception("Error Processing Request", 1);
			}
			die('["ok"]');
		}	
	}

	public function actionDelWord($set,$word){
		$word_model = Word::model()->findByAttributes(['word'=>$word,'id_set'=>(int)$set]);
		if($word_model == null){
			throw new Exception("Error Processing Request", 1);
		}else{
			Translate::model()->deleteAllByAttributes(['id_set'=>(int)$set,'id_word'=>(int)$word_model->id]);
			$word_model->delete();
			die('["ok"]');
		}
	}

	public function actionDelTranslate($set,$word,$translate){
		$word_model = Word::model()->findByAttributes(['id_set'=>(int)$set,'word'=>$word]);
		if($word_model == null){
			throw new Exception("Error Processing Request", 1);
		}else{
			$count_tr = Translate::model()->countByAttributes(['id_set'=>(int)$set,'id_word'=>(int)$word_model->id]);
			if($count_tr > 1){
				$tr = Translate::model()->findByAttributes(['id_set'=>(int)$set,'id_word'=>(int)$word_model->id,'translate'=>$translate]);
				$tr->delete();
				die('["ok"]');
			}
		}
		throw new Exception("Error Processing Request", 1);
	}
}