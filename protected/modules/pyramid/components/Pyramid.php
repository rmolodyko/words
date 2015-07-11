<?php

/**
 * Class Pyramid is the component of the pyramid engine
 */
class Pyramid extends CApplicationComponent
{

	/**
	 * Outputs result of execution some script
	 * @param null $output is the value which will returned to the client
	 * 		if the $output will not has status then status will be successful ie equal 1
	 */
	public function output($output = null)
	{
		$result = array();
		if(!empty($output)){
			if(is_array($output)||is_object($output)){
				$result = is_object($output) ? (array)$output : $output;

				//If output don't have status then set up this to 1
				if(!isset($result['status'])){
					$result['status'] = 1;
				}
			}else{
				$result = array('status'=>1,'data'=>$output);
			}
		}
		die(json_encode($result));
	}
}