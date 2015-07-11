<?php

/**
 * Class LoaderController for react with Loader javascript class
 */
class LoaderController extends Controller
{
	protected $allowFormats = array('js');

	/**
	 * @param null $path the value consists path to scripts which have to load to main init script
	 */
	public function actionGetClassesOfPath($path = null,$recursion = true)
	{
		$classes = $this->getClassesOfPath($path,boolval($recursion));
		Yii::app()->pyramid->output($classes);
	}

	/**
	 * Get all scripts in directory with right formats which stored in the value allowFormats
	 * @param $path is the string which consists with path to scripts which have to include
	 * 					if $path consists only with word without separators e.g. / or \
	 * 					then it is module and search will be in module /public/module/$path
	 * 					else search will be in /public/js/$path
	 * @param $recursion if it is true then search scripts in nested directories
	 * @return array of local path to scripts
	 */
	public function getClassesOfPath($path,$recursion){

		//Get base path to resource
		$pathToResource = Yii::app()->params['pathToResource'].DIRECTORY_SEPARATOR;

		//Skip all dotes
		$path = preg_replace('/(\.)|(\.\.)/','',$path);

		//Convert slashes to right form
		$path = preg_replace('/(\\\)|(\/)/',DIRECTORY_SEPARATOR,$path);

		//Solving right base directory
		if(false === strpos($path,DIRECTORY_SEPARATOR)){
			$localPath = 'module'.DIRECTORY_SEPARATOR;
			$pathToResource .= $localPath;
		}else{
			$localPath = 'js'.DIRECTORY_SEPARATOR;
			$pathToResource .= $localPath;
		}

		//Start scanning
		$result = $this->scanPath($pathToResource,$path,$recursion);

		//Filter files, get files with right formats
		$result = array_filter($result,function($e){
			foreach($this->allowFormats as $v){
				if($v == preg_replace('/^.*\.(\w*)$/','$1',$e)){
					return true;
				}
			}
			return false;
		});

		//Reindex key of array
		$result = array_values($result);

		return array('classes'=>$result,'localPath'=>DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.$localPath);
	}

	/**
	 * Scan base path and get all scripts
	 * @param $pathToResource base path
	 * @param $path local path to directory
	 * @param $recursion if elapse to the nested directories
	 * @return array of scripts with local path to them
	 */
	public function scanPath($pathToResource,$path,$recursion){

		//Get all scripts in the directory
		$items = scandir($pathToResource.$path);
		$result = array();

		//Iterate them
		foreach($items as $v){
			$pathItem = $pathToResource.$path.DIRECTORY_SEPARATOR.$v;

			//If file save it, if directory and need recursion start new iteration
			if(is_file($pathItem)){
				$result[] = $path.DIRECTORY_SEPARATOR.$v;
			}else if($recursion&&is_dir($pathItem)&&($v != '.'&& $v != '..')){

				//Merge results into one array
				$result = array_merge($result,$this->scanPath($pathToResource,$path.DIRECTORY_SEPARATOR.$v,true));
			}
		}

		return $result;
	}
}